import localFont from "next/font/local";

import "./globals.css";

import Providers from "@/components/providers";
import Header from "@/components/ui/header";

const sans = localFont({
  src: "../assets/font/monaspace/neon.woff2",
  display: "swap",
  variable: "--font-monaspace",
  declarations: [
    {
      prop: "font-feature-settings",
      value:
        "'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'ss10', 'liga'",
    },
  ],
});

const mono = localFont({
  src: [
    {
      path: "../assets/font/maple/Regular.ttf.woff2",
      style: "normal",
      weight: "100 600",
    },
    {
      path: "../assets/font/maple/Italic.ttf.woff2",
      style: "italic",
      weight: "100 600",
    },
    {
      path: "../assets/font/maple/SemiBold.ttf.woff2",
      style: "normal",
      weight: "700 900",
    },
    {
      path: "../assets/font/maple/SemiBoldItalic.ttf.woff2",
      style: "italic",
      weight: "700 900",
    },
  ],
  display: "swap",
  variable: "--font-maple-mono",
});

export { metadata as Metadata } from "@/config";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={`${sans.variable} ${mono.variable} font-sans antialiased`}>
      <Providers>
        <Header />
        {children}
      </Providers>
    </body>
  </html>
);

export default Layout;
