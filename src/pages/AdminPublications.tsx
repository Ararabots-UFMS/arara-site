import { FormEvent, useMemo, useState } from "react";
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

const CATEGORIES = ["Artigo", "Competição", "Extensão", "Reconhecimento", "Mídia"];

interface PublicationFormState {
  title: string;
  category: string;
  date: string;
  type: PublicationType;
  author: string;
  image: string;
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
  image: "",
  link: "",
  excerpt: "",
  content: "",
};

const normalizeImagePath = (input: string): string => {
  const value = input.trim();

  if (!value) {
    return "";
  }

  if (value.startsWith("/publications/")) {
    return value;
  }

  if (value.startsWith("public/publications/")) {
    return `/${value.replace(/^public\//, "")}`;
  }

  if (value.startsWith("publications/")) {
    return `/${value}`;
  }

  return `/publications/${value}`;
};

const isValidImagePath = (imagePath: string): boolean => {
  return /^\/publications\/[^/]+$/.test(imagePath);
};

const checkImageExists = async (imagePath: string): Promise<boolean> => {
  try {
    const response = await fetch(imagePath, { cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
};

const AdminPublications = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<PublicationFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPublicationId, setEditingPublicationId] = useState<string | null>(null);
  const [deletingPublicationId, setDeletingPublicationId] = useState<string | null>(null);

  const {
    data: publications = [],
    isLoading: isLoadingPublications,
    isError: isErrorPublications,
  } = usePublications();

  const normalizedImagePath = useMemo(() => normalizeImagePath(form.image), [form.image]);
  const orderedPublications = useMemo(() => [...publications].reverse(), [publications]);

  const updateField = <K extends keyof PublicationFormState>(field: K, value: PublicationFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialFormState);
    setEditingPublicationId(null);
  };

  const startEditing = (publication: Publication) => {
    setEditingPublicationId(publication.id);
    setForm({
      title: publication.title,
      category: publication.category,
      date: publication.date,
      type: publication.type,
      author: publication.author ?? "",
      image: publication.image,
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

    const imagePath = normalizeImagePath(form.image);

    if (!form.title.trim() || !form.category.trim() || !form.date.trim() || !form.excerpt.trim()) {
      toast.error("Preencha os campos obrigatorios: titulo, categoria, data e resumo.");
      return;
    }

    if (!isValidImagePath(imagePath)) {
      toast.error("A imagem deve seguir o padrao /publications/nomedaimagem.extensao.");
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
      const imageExists = await checkImageExists(imagePath);

      if (!imageExists) {
        toast.error("Imagem nao encontrada. Coloque o arquivo em public/publications e tente novamente.");
        setIsSubmitting(false);
        return;
      }

      if (editingPublicationId) {
        await updateDoc(doc(db, PUBLICATIONS_COLLECTION, editingPublicationId), {
          title: form.title.trim(),
          category: form.category.trim(),
          date: form.date.trim(),
          type: form.type,
          excerpt: form.excerpt.trim(),
          image: imagePath,
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
          image: imagePath,
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
                Suba a imagem em public/publications e depois cadastre a publicacao aqui.
              </CardDescription>
            </CardHeader>

            <CardContent>
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
                  <p className="text-sm text-muted-foreground">Imagem *</p>
                  <Input
                    value={form.image}
                    onChange={(e) => updateField("image", e.target.value)}
                    placeholder="Ex: cbr-2026.jpg ou /publications/cbr-2026.jpg"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Caminho final salvo: {normalizedImagePath || "-"}
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

                    <Button type="submit" disabled={isSubmitting}>
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
