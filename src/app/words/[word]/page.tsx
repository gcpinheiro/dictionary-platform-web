import { redirect } from "next/navigation";

interface WordAliasPageProps {
  params: Promise<{
    word: string;
  }>;
}

export default async function WordAliasPage({ params }: WordAliasPageProps) {
  const { word } = await params;

  redirect(`/palavras/${encodeURIComponent(word)}`);
}
