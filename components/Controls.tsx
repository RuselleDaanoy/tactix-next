"use client";

import { Infinity as InfinityIcon, RotateCcw } from "lucide-react";

type ControlsProps = {
  onResetSeries: () => void;
  infinite: boolean;
  onToggleInfinite: () => void;
  seriesStarted: boolean;
};

export default function Controls({
  onResetSeries,
  infinite,
  onToggleInfinite,
  seriesStarted,
}: ControlsProps) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onResetSeries}
        disabled={!seriesStarted}
        className="flex w-full items-center justify-center gap-2 border-2 border-ink bg-paper px-3 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px disabled:cursor-not-allowed disabled:border-ink/25 disabled:text-ink/35 disabled:hover:bg-paper disabled:hover:text-ink/35"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Reset series
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={infinite}
        onClick={onToggleInfinite}
        className={[
          "flex w-full items-center justify-between border-2 px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          infinite
            ? "border-accent bg-accent/10"
            : "border-ink/20 bg-transparent hover:border-ink",
        ].join(" ")}
      >
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          <InfinityIcon
            className={`h-4 w-4 ${infinite ? "text-accent" : "text-ink/60"}`}
            aria-hidden
          />
          Infinity mode
        </span>
        <span
          aria-hidden
          className={[
            "relative h-5 w-9 border-2 transition-colors",
            infinite ? "border-accent bg-accent/15" : "border-ink bg-paper",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-0 h-full w-3.5 transition-transform duration-200 ease-out",
              infinite
                ? "translate-x-[calc(100%+2px)] bg-accent"
                : "translate-x-0 bg-ink",
            ].join(" ")}
          />
        </span>
      </button>

      {infinite && (
        <p className="font-mono text-[10px] leading-relaxed text-ink/55">
          Your fourth mark retires your oldest one. The board never fills — three
          in a row is the only way out.
        </p>
      )}
    </div>
  );
}
