export interface PronunciationAudio {
  word: string;
  phonetic?: string;
  audioUrl?: string;
}

export interface DictionaryApiPhonetic {
  text?: string;
  audio?: string;
}

export interface DictionaryApiEntry {
  word: string;
  phonetic?: string;
  phonetics?: DictionaryApiPhonetic[];
}
