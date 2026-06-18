export interface WordDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
}

export interface WordMeaning {
  partOfSpeech: string;
  definitions: WordDefinition[];
  synonyms?: string[];
}

export interface WordDetail {
  id: string;
  word: string;
  phonetic?: string;
  meanings: WordMeaning[];
}

export interface WordSummary {
  id: string;
  word: string;
}

export interface FavoriteWord {
  id: string;
  userId: string;
  wordId: string;
  word: string;
}
