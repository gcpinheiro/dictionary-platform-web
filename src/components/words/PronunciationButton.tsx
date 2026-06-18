"use client";

import { LoaderCircle, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { getPronunciationAudio } from "@/services/pronunciation.service";

interface PronunciationButtonProps {
  word: string;
}

function playAudio(audioUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);

    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error("Não foi possível reproduzir o áudio."));
    audio.play().catch(reject);
  });
}

function speakWord(word: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      reject(new Error("Seu navegador não possui suporte a voz."));
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.onend = () => resolve();
    utterance.onerror = () =>
      reject(new Error("Não foi possível reproduzir a pronúncia."));

    window.speechSynthesis.speak(utterance);
  });
}

export function PronunciationButton({ word }: PronunciationButtonProps) {
  const { showToast } = useToast();
  const cachedAudioUrl = useRef<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDisabled = isLoading || isPlaying;

  async function handlePlay() {
    if (isDisabled) {
      return;
    }

    setIsLoading(true);

    try {
      if (cachedAudioUrl.current === undefined) {
        try {
          const pronunciation = await getPronunciationAudio(word);
          cachedAudioUrl.current = pronunciation?.audioUrl ?? null;
        } catch {
          cachedAudioUrl.current = null;
        }
      }

      setIsLoading(false);
      setIsPlaying(true);

      if (cachedAudioUrl.current) {
        try {
          await playAudio(cachedAudioUrl.current);
          return;
        } catch {
          await speakWord(word);
          return;
        }
      }

      await speakWord(word);
    } catch {
      showToast({
        type: "error",
        message: "Não foi possível reproduzir a pronúncia.",
      });
    } finally {
      setIsLoading(false);
      setIsPlaying(false);
    }
  }

  return (
    <button
      aria-label={`Ouvir pronúncia de ${word}`}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] disabled:cursor-wait disabled:opacity-70"
      disabled={isDisabled}
      onClick={handlePlay}
      type="button"
    >
      {isLoading || isPlaying ? (
        <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
      ) : (
        <Volume2 aria-hidden="true" size={18} />
      )}
      {isLoading
        ? "Carregando..."
        : isPlaying
          ? "Reproduzindo..."
          : "Ouvir pronúncia"}
    </button>
  );
}
