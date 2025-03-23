import Link from "next/link";

import type { ReactNode } from "react";

const HoverLink = (props: { children: ReactNode; href: string }) => (
  <Link prefetch={false} className="hover:text-primary hover:underline" {...props} />
);

const Footer = () => (
  <footer className="mt-8 flex justify-center bg-base-300 py-8">
    <div className="max-w-(--breakpoint-lg) grow">
      <p className="divide-x divide-base-content/40 text-sm *:px-3">
        <span>@{new Date().getFullYear()} BrandenXia</span>
        <HoverLink href="/feed">RSS</HoverLink>
        <HoverLink href="/sitemap.xml">Sitemap</HoverLink>
        <HoverLink href="https://github.com/BrandenXia/blog">Source Code</HoverLink>
      </p>
    </div>
  </footer>
);

export default Footer;
