"use client";

import { interpolate, m, mix } from "framer-motion";
import { useAtomValue } from "jotai";

import { scrollProgressAtom } from "./atom";

import type { JSXWrapper } from "@/types/utils";
import type { ComponentProps } from "react";

type CSSProperties = ComponentProps<typeof m.div>["animate"];

const Bg: JSXWrapper = ({ children }) => {
  const scrollProgress = useAtomValue(scrollProgressAtom);

  const bgOpacity = mix(0, 0.8, scrollProgress);
  const borderOpacityMix = interpolate([0, 1], ["0%", "80%"]);
  const borderOpacity = borderOpacityMix(scrollProgress);

  return (
    <m.div
      initial={false}
      animate={
        {
          "--tw-bg-opacity": bgOpacity,
          "--tw-border-opacity": borderOpacity,
          willChange: "background-color, border-color",
        } as CSSProperties
      }
      {...{
        className:
          "size-full transform-gpu border-b border-b-neutral-content/(--tw-border-opacity) bg-base-100/(--tw-bg-opacity) backdrop-blur-md backdrop-saturate-[180%] [backface-visibility:hidden] dark:border-b-0 dark:backdrop-saturate-100",
      }}
    >
      {children}
    </m.div>
  );
};

export default Bg;
