import { FormEvent, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { PublicationType } from "@/types/publication";
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
  const [form, setForm] = useState<PublicationFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizedImagePath = useMemo(() => normalizeImagePath(form.image), [form.image]);

  const updateField = <K extends keyof PublicationFormState>(field: K, value: PublicationFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
      setForm(initialFormState);
    } catch {
      toast.error("Nao foi possivel criar a publicacao. Verifique as regras do Firestore e tente novamente.");
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Salvando..." : "Publicar no Firestore"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPublications;
