import type { MetadataRoute } from "next";

/**
 * Lets the site be installed to a phone home screen. `maskable` is a separate
 * entry because Android crops adaptive icons to a circle, so that version
 * sets the mark smaller, inside the safe zone.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Calibrate",
    short_name: "Calibrate",
    description:
      "Named, reusable design patterns for the trust layer between humans and autonomous machines.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
