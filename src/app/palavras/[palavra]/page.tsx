import { AuthGuard } from "@/components/auth/AuthGuard";
import { WordDetails } from "@/components/words/WordDetails";
import { getWordDetails } from "@/services/words.service";
import type { WordDetail } from "@/types/word";

interface WordPageProps {
  params: Promise<{
    palavra: string;
  }>;
}

export default async function WordPage({ params }: WordPageProps) {
  const { palavra } = await params;
  const decodedWord = decodeURIComponent(palavra);
  let wordDetails: WordDetail | null = null;
  let errorMessage = "";

  try {
    wordDetails = await getWordDetails(decodedWord);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Não foi possível carregar a palavra.";
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
        <WordDetails
          errorMessage={errorMessage}
          requestedWord={decodedWord}
          word={wordDetails}
        />
      </main>
    </AuthGuard>
  );
}
