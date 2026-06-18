interface PaginacaoDicionarioProps {
  currentPage: number;
  hasNextPage: boolean;
  isLoading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function PaginacaoDicionario({
  currentPage,
  hasNextPage,
  isLoading,
  onNextPage,
  onPreviousPage,
}: PaginacaoDicionarioProps) {
  return (
    <nav
      aria-label="Paginação do dicionário"
      className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:flex-row"
    >
      <button
        className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        disabled={isLoading || currentPage === 1}
        onClick={onPreviousPage}
        type="button"
      >
        Anterior
      </button>

      <p className="text-sm font-semibold text-[#475569]">
        Página {currentPage}
      </p>

      <button
        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        disabled={isLoading || !hasNextPage}
        onClick={onNextPage}
        type="button"
      >
        Próxima
      </button>
    </nav>
  );
}

