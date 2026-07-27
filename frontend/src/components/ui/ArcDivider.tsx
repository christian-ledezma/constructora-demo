import { cn } from "@/lib/utils";

interface ArcDividerProps {
  className?: string;
  tone?: "stone" | "paper" | "charcoal";
}

const strokeByTone: Record<NonNullable<ArcDividerProps["tone"]>, string> = {
  stone: "stroke-stone",
  paper: "stroke-paper",
  charcoal: "stroke-charcoal",
};

/**
 * A thin quarter-arc rule, the recurring signature mark of the site.
 * It quotes the open, compass-drawn curve in the Bernales wordmark
 * (the "R" and "C" strokes) and shows up wherever a section needs a
 * small full stop: under eyebrows, section titles and card labels.
 */
export default function ArcDivider({
  className,
  tone = "stone",
}: ArcDividerProps) {
  return (
    <svg
      viewBox="0 0 64 16"
      className={cn("h-4 w-16", className)}
      aria-hidden="true"
    >
      <path
        d="M2 14 C2 6 10 2 30 2 L62 2"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={strokeByTone[tone]}
        pathLength={120}
        strokeDasharray={120}
        style={{ animation: "var(--animate-arc-draw)" }}
      />
    </svg>
  );
}
