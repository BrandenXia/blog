"use client";

import { AnimatePresence, m } from "framer-motion";
import { Children, cloneElement, useEffect, useId, useState } from "react";

import cn from "@/lib/cn";

import type { Transition } from "framer-motion";
import type { ReactElement } from "react";

type AnimatedBackgroundProps = {
  children: ReactElement<{ "data-id": string }>[] | ReactElement<{ "data-id": string }>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

const AnimatedBackground = ({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);

    if (onValueChange) {
      onValueChange(id);
    }
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Children.map(children, (child: any, index) => {
    const id = child.props["data-id"];

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
        };

    return cloneElement(
      child,
      {
        key: index,
        className: cn("relative inline-flex", child.props.className),
        "aria-selected": activeId === id,
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <m.div
              layoutId={`background-${uniqueId}`}
              {...{ className: cn("absolute inset-0", className) }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
                ...transition,
              }}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <span className="z-10">{child.props.children}</span>
      </>,
    );
  });
};

export default AnimatedBackground;
