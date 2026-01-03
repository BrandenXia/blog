"use client";

import { LazyMotion } from "framer-motion";

import type { FC, PropsWithChildren } from "react";

const loadFeatures = () => import("./features").then((res) => res.default);

const LazyMotionProvider: FC<PropsWithChildren> = ({ children }) => (
  <LazyMotion features={loadFeatures}>{children}</LazyMotion>
);

export default LazyMotionProvider;
