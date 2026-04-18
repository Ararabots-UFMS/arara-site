import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { usePublications } from "@/hooks/usePublications";
import { Publication, PublicationType } from "@/types/publication";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const PUBLICATIONS_COLLECTION = "publications";
const SUPABASE_BUCKET = "ararasite-images";

const CATEGORIES = ["Artigo", "Competição", "Extensão", "Reconhecimento", "Mídia"];

interface PublicationFormState {
  title: string;
  category: string;
  date: string;
  type: PublicationType;
  author: string;
  link: string;
  excerpt: string;
  content: string;
}

const initialFormState: PublicationFormState = {
  title: "",
  category: "",
  date: "",
  type: "internal",
  author: "",
  link: "",
  excerpt: "",
  content: "",
};

const uploadPublicationImage = async (file: File): Promise<string> => {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `publications/${Date.now()}-${safeFileName}`;

  const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(filePath, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
};

const AdminPublications = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<PublicationFormState>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPublicationId, setEditingPublicationId] = useState<string | null>(null);
  const [deletingPublicationId, setDeletingPublicationId] = useState<string | null>(null);

  const {
    data: publications = [],
    isLoading: isLoadingPublications,
    isError: isErrorPublications,
  } = usePublications();

  const orderedPublications = useMemo(() => [...publications].reverse(), [publications]);

  const updateField = <K extends keyof PublicationFormState>(field: K, value: PublicationFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageFile(event.target.files?.[0] ?? null);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setImageFile(null);
    setImageInputKey((currentKey) => currentKey + 1);
    setEditingPublicationId(null);
  };

  const startEditing = (publication: Publication) => {
    setEditingPublicationId(publication.id);
    setImageFile(null);
    setImageInputKey((currentKey) => currentKey + 1);
    setForm({
      title: publication.title,
      category: publication.category,
      date: publication.date,
      type: publication.type,
      author: publication.author ?? "",
      link: publication.link ?? "",
      excerpt: publication.excerpt,
      content: publication.content ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refreshPublications = async () => {
    await queryClient.invalidateQueries({ queryKey: ["publications"] });
  };

  const handleDeletePublication = async (publication: Publication) => {
    if (!db) {
      toast.error("Configure o Firebase para apagar publicacoes.");
      return;
    }

    const confirmDelete = window.confirm(
      `Tem certeza que deseja apagar a publicação "${publication.title}"? Esta ação não pode ser desfeita.`,
    );

    if (!confirmDelete) {
      return;
    }

    setDeletingPublicationId(publication.id);

    try {
      await deleteDoc(doc(db, PUBLICATIONS_COLLECTION, publication.id));
      toast.success("Publicacao apagada com sucesso.");

      if (editingPublicationId === publication.id) {
        resetForm();
      }

      await refreshPublications();
    } catch {
      toast.error("Nao foi possivel apagar a publicacao.");
    } finally {
      setDeletingPublicationId(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!db) {
      toast.error("Configure o Firebase antes de salvar publicacoes.");
      return;
    }

    let imageUrl = editingPublicationId ? publications.find((publication) => publication.id === editingPublicationId)?.image ?? "" : "";

    if (!form.title.trim() || !form.category.trim() || !form.date.trim() || !form.excerpt.trim()) {
      toast.error("Preencha os campos obrigatorios: titulo, categoria, data e resumo.");
      return;
    }

    if (!imageFile && !imageUrl) {
      toast.error("Envie uma imagem para continuar.");
      return;
    }

    if (form.type === "external" && !form.link.trim()) {
      toast.error("Publicacao externa precisa de um link.");
      return;
    }

    if (form.type === "internal" && !form.content.trim()) {
      toast.error("Publicacao interna precisa de conteudo em HTML.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase && imageFile) {
        toast.error("Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para enviar imagens.");
        return;
      }

      if (imageFile) {
        imageUrl = await uploadPublicationImage(imageFile);
      }

      if (!imageUrl) {
        throw new Error("Missing publication image URL.");
      }

      if (editingPublicationId) {
        await updateDoc(doc(db, PUBLICATIONS_COLLECTION, editingPublicationId), {
          title: form.title.trim(),
          category: form.category.trim(),
          date: form.date.trim(),
          type: form.type,
          excerpt: form.excerpt.trim(),
          image: imageUrl,
          author: form.author.trim() ? form.author.trim() : deleteField(),
          content:
            form.type === "internal" && form.content.trim() ? form.content.trim() : deleteField(),
          link: form.type === "external" && form.link.trim() ? form.link.trim() : deleteField(),
          updatedAt: serverTimestamp(),
        });

        toast.success("Publicacao atualizada com sucesso.");
      } else {
        await addDoc(collection(db, PUBLICATIONS_COLLECTION), {
          title: form.title.trim(),
          category: form.category.trim(),
          date: form.date.trim(),
          type: form.type,
          excerpt: form.excerpt.trim(),
          image: imageUrl,
          ...(form.author.trim() ? { author: form.author.trim() } : {}),
          ...(form.content.trim() ? { content: form.content.trim() } : {}),
          ...(form.link.trim() ? { link: form.link.trim() } : {}),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        toast.success("Publicacao criada com sucesso no Firestore.");
      }

      resetForm();
      await refreshPublications();
    } catch {
      toast.error("Nao foi possivel salvar a publicacao. Verifique as regras do Firestore e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Admin Publicacoes | AraraBots</title>
        <meta
          name="description"
          content="Painel interno para cadastrar novas publicacoes no Firestore."
        />
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card/60 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Admin de Publicacoes</CardTitle>
              <CardDescription>
                Envie uma imagem para o Supabase antes de salvar a publicacao.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {!isSupabaseConfigured && (
                <div className="mb-6 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-foreground">
                  Supabase nao esta configurado. O formulario vai carregar, mas o upload de imagem
                  fica indisponivel ate definir VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {editingPublicationId && (
                  <div className="rounded-md border border-primary/40 bg-primary/10 p-3 text-sm text-foreground">
                    Modo edicao ativo. Salve para atualizar esta publicacao ou cancele para voltar ao cadastro novo.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Titulo *</p>
                    <Input
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="Ex: Participacao na CBR 2026"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Data *</p>
                    <Input
                      value={form.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      placeholder="Ex: 17 Mar 2026"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Categoria *</p>
                    <Select value={form.category} onValueChange={(value) => updateField("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tipo *</p>
                    <Select value={form.type} onValueChange={(value: PublicationType) => updateField("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Interna</SelectItem>
                        <SelectItem value="external">Externa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Autor (opcional)</p>
                  <Input
                    value={form.author}
                    onChange={(e) => updateField("author", e.target.value)}
                    placeholder="Ex: Equipe AraraBots"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Imagem via Supabase</p>
                  <Input
                    key={imageInputKey}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={!isSupabaseConfigured}
                  />
                  <p className="text-xs text-muted-foreground">
                    {imageFile?.name
                      ? `Arquivo selecionado: ${imageFile.name}`
                      : editingPublicationId
                        ? "Mantendo a imagem atual até você enviar uma nova."
                        : "Selecione um arquivo de imagem para publicar."}
                  </p>
                </div>

                {form.type === "external" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Link externo *</p>
                    <Input
                      value={form.link}
                      onChange={(e) => updateField("link", e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Resumo (excerpt) *</p>
                  <Textarea
                    value={form.excerpt}
                    onChange={(e) => updateField("excerpt", e.target.value)}
                    placeholder="Resumo breve que aparece no card"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                {form.type === "internal" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Conteudo HTML *</p>
                    <Textarea
                      value={form.content}
                      onChange={(e) => updateField("content", e.target.value)}
                      placeholder={'Ex: <p class="mb-4">Texto da publicacao...</p>'}
                      className="min-h-[220px] font-mono text-xs"
                      required
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <div className="flex gap-3">
                    {editingPublicationId && (
                      <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting}>
                        Cancelar edicao
                      </Button>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || (!isSupabaseConfigured && !editingPublicationId)}
                    >
                      {isSubmitting
                        ? "Salvando..."
                        : editingPublicationId
                          ? "Atualizar publicacao"
                          : "Publicar no Firestore"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-white/10 backdrop-blur-md mt-8">
            <CardHeader>
              <CardTitle>Publicacoes existentes</CardTitle>
              <CardDescription>
                Edite ou apague qualquer publicacao cadastrada no Firestore.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingPublications && (
                <p className="text-sm text-muted-foreground">Carregando publicacoes...</p>
              )}

              {isErrorPublications && (
                <p className="text-sm text-destructive">Nao foi possivel carregar as publicacoes.</p>
              )}

              {!isLoadingPublications && !isErrorPublications && orderedPublications.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma publicacao cadastrada ainda.</p>
              )}

              {!isLoadingPublications && !isErrorPublications && orderedPublications.length > 0 && (
                <div className="space-y-3">
                  {orderedPublications.map((publication) => (
                    <div
                      key={publication.id}
                      className="rounded-md border border-white/10 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-semibold">{publication.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {publication.date} · {publication.category} · {publication.type}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(publication)}
                        >
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={deletingPublicationId === publication.id}
                          onClick={() => handleDeletePublication(publication)}
                        >
                          {deletingPublicationId === publication.id ? "Apagando..." : "Apagar"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPublications;
