import type {
  DictionaryApiEntry,
  PronunciationAudio,
} from "@/types/pronunciation";

const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

function normalizeAudioUrl(audioUrl: string): string {
  if (audioUrl.startsWith("//")) {
    return `https:${audioUrl}`;
  }

  return audioUrl;
}

export async function getPronunciationAudio(
  word: string,
): Promise<PronunciationAudio | null> {
  const response = await fetch(
    `${DICTIONARY_API_URL}/${encodeURIComponent(word)}`,
    {
      cache: "force-cache",
    },
  );

  if (!response.ok) {
    return null;
  }

  const entries = (await response.json()) as DictionaryApiEntry[];
  const [entry] = entries;

  if (!entry) {
    return null;
  }

  const phoneticWithAudio = entry.phonetics?.find((phonetic) =>
    Boolean(phonetic.audio),
  );
  const phoneticWithText = entry.phonetics?.find((phonetic) =>
    Boolean(phonetic.text),
  );

  return {
    word: entry.word,
    phonetic: entry.phonetic ?? phoneticWithText?.text,
    audioUrl: phoneticWithAudio?.audio
      ? normalizeAudioUrl(phoneticWithAudio.audio)
      : undefined,
  };
}
