import Link from "next/link";
import ArcDivider from "@/components/ui/ArcDivider";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 py-32 text-center">
      <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-stone">
        Error 404
      </span>
      <h1 className="font-display mt-6 text-4xl font-semibold uppercase tracking-tight text-ink sm:text-5xl">
        Esta página no existe
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
        Puede que el enlace esté roto o que la página se haya movido. Volvé al
        inicio para ver los proyectos disponibles.
      </p>
      <ArcDivider tone="stone" className="mt-8" />
      <Link
        href="/"
        className="mt-10 rounded-full bg-charcoal px-8 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-charcoal-deep"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
