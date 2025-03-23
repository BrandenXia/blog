import type { JSXWrapper } from "@/types/utils";

import "katex/dist/katex.min.css";

const Layout: JSXWrapper = ({ children }) => (
  <div className="mx-auto max-w-(--breakpoint-xl) xl:flex">{children}</div>
);

export default Layout;
