"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import ArcDivider from "@/components/ui/ArcDivider";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS } from "@/components/layout/Header";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const noopSubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}


export default function MobileNav({ open, onClose }: MobileNavProps) {
  const isClient = useIsClient();

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-charcoal-deep md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <Logo className="h-8 w-auto" />
            <button
              type="button"
              onClick={onClose}
              className="text-white"
              aria-label="Cerrar menú de navegación"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-8 px-8">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index + 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-4xl font-medium uppercase tracking-wide text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <ArcDivider tone="stone" className="mt-4 h-6 w-24" />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!isClient) return null;
  return createPortal(panel, document.body);
}
