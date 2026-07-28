/**
 * Single source of truth for every image path used in the app.
 *
 * All filenames are placeholders. Replace the files inside
 * `public/images/` with real photography and this object never
 * needs to change — except bumping the count below if a project
 * gets more or fewer photos.
 */

/** Builds `/images/<slug>-1.jpg` … `/images/<slug>-<count>.jpg`. */
function galleryPaths(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/${slug}-${i + 1}.jpg`);
}

export const IMAGES = {
  hero: "/images/hero.jpg",
  logo: "/images/logo.png",
  projects: {
    "begonias-de-aranjuez": {
      cover: "/images/begonias-1.jpg",
      gallery: galleryPaths("begonias", 6),
      tour360: ["/images/begonias-360-1.jpg", "/images/begonias-360-2.jpg"] as [
        string,
        string,
      ],
    },
    "prados-del-oeste": {
      cover: "/images/prados-1.jpg",
      gallery: galleryPaths("prados", 4),
      tour360: ["/images/prados-360-1.jpg", "/images/prados-360-2.jpg"] as [
        string,
        string,
      ],
    },
  },
} as const;
