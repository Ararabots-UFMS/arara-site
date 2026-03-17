import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Publication } from "@/types/publication";

const COLLECTION_NAME = "publications";

const isPublicationType = (value: unknown): value is Publication["type"] => {
  return value === "internal" || value === "external";
};

const toPublication = (id: string, raw: unknown): Publication => {
  const data = (raw ?? {}) as Record<string, unknown>;

  return {
    id,
    title: String(data.title ?? "Sem título"),
    category: String(data.category ?? "Sem categoria"),
    date: String(data.date ?? "01 Jan 1970"),
    excerpt: String(data.excerpt ?? ""),
    image: String(data.image ?? ""),
    author: data.author ? String(data.author) : undefined,
    content: data.content ? String(data.content) : undefined,
    type: isPublicationType(data.type) ? data.type : "internal",
    link: data.link ? String(data.link) : undefined,
  };
};

const fetchPublications = async (): Promise<Publication[]> => {
  const publicationsQuery = query(collection(db, COLLECTION_NAME));
  const snapshot = await getDocs(publicationsQuery);

  return snapshot.docs.map((doc) => toPublication(doc.id, doc.data()));
};

export const usePublications = () => {
  return useQuery({
    queryKey: ["publications"],
    queryFn: fetchPublications,
    staleTime: 1000 * 60 * 5,
  });
};