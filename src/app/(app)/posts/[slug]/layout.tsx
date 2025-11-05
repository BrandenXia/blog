import type { FC, PropsWithChildren } from "react";

import "katex/dist/katex.min.css";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="mx-auto max-w-(--breakpoint-xl) xl:flex">{children}</div>
);

export default Layout;
