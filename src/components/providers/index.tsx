import LazyMotionProvider from "./framer-motion";

import type { FC, PropsWithChildren } from "react";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <LazyMotionProvider>{children}</LazyMotionProvider>
);

export default Providers;
