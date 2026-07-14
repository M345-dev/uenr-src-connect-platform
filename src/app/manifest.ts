import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SRC Connect",
    short_name: "SRC Connect",
    description: "Know what matters. Connect with campus. Get help. Be represented.",
    start_url: "/connect",
    display: "standalone",
    background_color: "#f7faf7",
    theme_color: "#145b38",
    icons: [
      { src: "/images/uenr-logo.png", sizes: "any", type: "image/png" },
    ],
  };
}
