/**
 * Single source of truth for every image path used in the app.
 *
 * All filenames are placeholders. Replace the files inside
 * `public/images/` with real photography and this object never
 * needs to change.
 */
export const IMAGES = {
  hero: "/images/hero.jpg",
  projects: {
    "begonias-de-aranjuez": {
      cover: "/images/begonias-1.jpg",
      gallery: [
        "/images/begonias-1.jpg",
        "/images/begonias-2.jpg",
        "/images/begonias-3.jpg",
        "/images/begonias-4.jpg",
        "/images/begonias-5.jpg",
        "/images/begonias-6.jpg",
      ],
      tour360: ["/images/begonias-360-1.jpg", "/images/begonias-360-2.jpg"] as [
        string,
        string,
      ],
    },
    "prados-del-oeste": {
      cover: "/images/prados-1.jpg",
      gallery: [
        "/images/prados-1.jpg",
        "/images/prados-2.jpg",
        "/images/prados-3.jpg",
        "/images/prados-4.jpg",
      ],
      tour360: ["/images/prados-360-1.jpg", "/images/prados-360-2.jpg"] as [
        string,
        string,
      ],
    },
  },
} as const;
