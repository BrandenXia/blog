import { Suspense } from "react";

import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="mx-auto mt-12 mb-16 max-w-(--breakpoint-2xl)">
    <Suspense>{children}</Suspense>
  </div>
);

export default Layout;
