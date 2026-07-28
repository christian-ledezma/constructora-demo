import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import ArcDivider from "@/components/ui/ArcDivider";
import Logo from "@/components/ui/Logo";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
} from "@/components/ui/SocialIcons";

const socials = [
  { href: "https://instagram.com", label: "Instagram", icon: InstagramIcon },
  { href: "https://facebook.com", label: "Facebook", icon: FacebookIcon },
  { href: "https://tiktok.com", label: "LinkedIn", icon: TikTokIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-charcoal-deep text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo className="h-12 w-auto" />
            <ArcDivider tone="stone" className="my-6" />
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Diseñamos y construimos edificios residenciales en Cochabamba,
              con foco en la arquitectura, los materiales y los detalles que
              hacen de un departamento un hogar.
            </p>
            <div className="mt-8 flex gap-5">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="text-white/70 transition-colors hover:text-stone"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-stone-light">
              Contacto
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                Av. Las Begonias / calle Los Sauces , Cochabamba, Bolivia
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <a href="tel:+59144001234" className="hover:text-stone">
                  +591 4 400 1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:contacto@bernalesconstructora.com"
                  className="hover:text-stone"
                >
                  contacto@bernalesconstructora.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-stone-light">
              Proyectos
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li>
                <Link href="/proyectos/begonias-de-aranjuez" className="hover:text-stone">
                  Begonias de Aranjuez
                </Link>
              </li>
              <li>
                <Link href="/proyectos/prados-del-oeste" className="hover:text-stone">
                  Prados del Oeste
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Bernales Constructora. Todos los derechos reservados.</p>
          <p>Cochabamba, Bolivia</p>
        </div>
      </div>
    </footer>
  );
}
