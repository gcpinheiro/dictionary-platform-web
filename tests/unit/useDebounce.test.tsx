import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("mantém o valor anterior até o tempo de debounce terminar", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: "solar",
        },
      },
    );

    expect(result.current).toBe("solar");

    rerender({ value: "storage" });

    expect(result.current).toBe("solar");

    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(result.current).toBe("solar");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("storage");
  });

  it("cancela atualizações pendentes quando o valor muda novamente", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: "grid",
        },
      },
    );

    rerender({ value: "power" });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    rerender({ value: "battery" });
    act(() => {
      vi.advanceTimersByTime(399);
    });

    expect(result.current).toBe("grid");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("battery");
  });
});
