"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import ArcDivider from "@/components/ui/ArcDivider";
import { IMAGES } from "@/data/images";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center overflow-hidden bg-charcoal-deep">
      <Image
        src={IMAGES.hero}
        alt="Fachada de un edificio residencial Bernales Constructora al atardecer"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/60 to-charcoal-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/70 via-transparent to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pt-16 lg:px-10"
      >
        <motion.span
          variants={item}
          className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-stone-light"
        >
          Bernales Constructora — Cochabamba
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display mt-6 max-w-3xl text-5xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Edificios que se
          <br /> habitan con calma
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Dos desarrollos residenciales en Cochabamba, diseñados con
          arquitectura contemporánea, materiales nobles y la atención al
          detalle de una constructora que firma cada proyecto.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <ArcDivider tone="paper" className="h-5 w-20" />
        </motion.div>
      </motion.div>

      <motion.a
        href="#proyectos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
        aria-label="Ir a proyectos"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.3em]">
          Proyectos
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}
