import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SRC Connect — UENR student life, connected",
    template: "%s · SRC Connect",
  },
  description:
    "A trusted digital home for UENR information, campus community, student support and SRC accountability.",
  applicationName: "SRC Connect",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#145b38",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
