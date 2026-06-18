import type { FavoriteWord } from "@/types/favorite";

interface ModalConfirmacaoRemocaoProps {
  favorite: FavoriteWord;
  isRemoving: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ModalConfirmacaoRemocao({
  favorite,
  isRemoving,
  onCancel,
  onConfirm,
}: ModalConfirmacaoRemocaoProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 px-4 py-6">
      <section
        aria-labelledby="remove-favorite-title"
        aria-modal="true"
        className="w-full max-w-md animate-soft-scale rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-md"
        role="dialog"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-[#DC2626]">
          Remover favorito
        </p>
        <h2
          className="mt-3 text-2xl font-bold leading-tight text-[#0F172A]"
          id="remove-favorite-title"
        >
          Remover &quot;{favorite.word}&quot; dos favoritos?
        </h2>
        <p className="mt-3 text-sm text-[#475569]">
          Você poderá favoritar essa palavra novamente pela página de detalhes.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            disabled={isRemoving}
            onClick={onCancel}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#DC2626] px-4 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:opacity-70"
            disabled={isRemoving}
            onClick={onConfirm}
            type="button"
          >
            {isRemoving ? "Removendo..." : "Remover dos favoritos"}
          </button>
        </div>
      </section>
    </div>
  );
}
