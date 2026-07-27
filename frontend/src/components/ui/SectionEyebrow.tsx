import { cn } from "@/lib/utils";
import ArcDivider from "@/components/ui/ArcDivider";

interface SectionEyebrowProps {
  children: React.ReactNode;
  tone?: "stone" | "paper" | "charcoal";
  className?: string;
}

export default function SectionEyebrow({
  children,
  tone = "stone",
  className,
}: SectionEyebrowProps) {
  const textTone =
    tone === "paper" ? "text-stone-light" : "text-stone";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span
        className={cn(
          "font-display text-xs font-semibold uppercase tracking-[0.3em]",
          textTone,
        )}
      >
        {children}
      </span>
      <ArcDivider tone={tone === "paper" ? "paper" : tone} />
    </div>
  );
}
