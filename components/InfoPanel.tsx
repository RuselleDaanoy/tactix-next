"use client";

import { ArrowRight, Infinity as InfinityIcon, RotateCcw } from "lucide-react";

const STEPS = [
  {
    title: "Take turns",
    body: "Players alternate placing X and O on any empty square.",
  },
  {
    title: "Make a line",
    body: "First to three in a row — across, down, or diagonally — wins the round.",
  },
  {
    title: "Follow the score",
    body: "The series scoreboard keeps wins and draws; rounds advance automatically.",
  },
];

const FEATURES = [
  {
    icon: RotateCcw,
    label: "Reset series",
    body: "Wipes the scoreboard and round count, then starts round 01.",
  },
  {
    icon: InfinityIcon,
    label: "Infinity mode",
    body: "Your fourth mark retires your oldest, so the board never fills.",
  },
  {
    icon: ArrowRight,
    label: "Next round",
    body: "On the result card, skips the wait and deals the next round.",
  },
];

export default function InfoPanel() {
  return (
    <aside
      aria-labelledby="briefing-title"
      className="border-t-2 border-ink pt-4 lg:border-l-2 lg:border-t-0 lg:pl-8 lg:pt-1"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/60">
        Briefing
      </p>
      <h2
        id="briefing-title"
        className="mt-1 text-2xl font-black leading-none tracking-[-0.04em]"
      >
        Three. In a row.
      </h2>
      <p className="mt-2.5 text-sm leading-relaxed text-ink/70">
        A two-player duel on a 3×3 grid. Hold the centre, watch the diagonals,
        and take the series one round at a time.
      </p>

      <section className="mt-6">
        <h3 className="border-b border-ink/20 pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
          How to play
        </h3>
        <ol className="mt-3 space-y-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center border border-ink font-mono text-[9px] font-bold tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink/60">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6">
        <h3 className="border-b border-ink/20 pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
          Controls & features
        </h3>
        <dl className="mt-3 space-y-3">
          {FEATURES.map(({ icon: Icon, label, body }) => (
            <div key={label} className="flex gap-2.5">
              <Icon
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                aria-hidden
              />
              <div>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
                  {label}
                </dt>
                <dd className="mt-0.5 text-xs leading-relaxed text-ink/60">
                  {body}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-6 border-t border-ink/15 pt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-ink/40">
        Local two-player · Wins and draws tracked per session
      </p>
    </aside>
  );
}
