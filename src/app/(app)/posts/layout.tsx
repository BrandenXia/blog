import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="mx-auto my-16 max-w-(--breakpoint-2xl)">{children}</div>
);

export default Layout;
