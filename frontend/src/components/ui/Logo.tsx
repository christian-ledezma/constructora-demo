import Image from "next/image";
import { IMAGES } from "@/data/images";

interface LogoProps {
  className?: string;
}

/**
 * Renders the Bernales Constructora logo file. Expects a light/white
 * version with a transparent background (the header and footer are
 * always on a dark charcoal surface). Replace
 * `public/images/logo.png` with the real logo at any time — nothing
 * else needs to change.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src={IMAGES.logo}
      alt="Bernales Constructora"
      width={900}
      height={230}
      priority
      className={className}
    />
  );
}
