import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tatkal Quota Analyzer",
  description: "Analyze Tatkal and Premium Tatkal seat allocations for Indian Railway trains.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Runs synchronously during HTML parsing — no flash before hydration.
const themeScript = `(function(){
  try {
    var t = localStorage.getItem("tqa-theme");
    if (!t) t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
  } catch(e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
