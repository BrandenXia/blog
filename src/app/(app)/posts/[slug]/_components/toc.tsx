"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import cn from "@/lib/cn";

import type { FC } from "react";
import type { TocItem } from "remark-flexible-toc";

const Toc: FC<{ toc: TocItem[] }> = ({ toc }) => {
  const filteredToc = toc.filter((item) => item.depth === 2 || item.depth === 3);

  const [active, setActive] = useState<string | null>(null);
  const [tocPos, setTocPos] = useState<[string, number][]>([]);

  const { scrollY } = useScroll();

  useEffect(() => {
    const updatePos = async () => {
      const positions: [string, number][] = filteredToc.map((i) => [
        i.href,
        document.getElementById(i.href.slice(1))?.offsetTop || 0,
      ]);
      setTocPos(positions);
    };
    updatePos();
  }, [filteredToc]);

  const handleScroll = useCallback(
    (latest: number) => {
      const active = tocPos.findLast(([, pos]) => latest + 100 >= pos);
      if (active) setActive(active[0]);
    },
    [tocPos],
  );
  useMotionValueEvent(scrollY, "change", handleScroll);

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", id);
  }, []);

  return (
    <aside className="text-[14px]">
      {filteredToc.length >= 0 && <h3 className="font-semibold uppercase">On this page</h3>}
      <ul className="text-fg-200 mt-2">
        {filteredToc.map((item) => (
          <li
            key={item.href}
            className={cn(
              "before:bg-bg-100 relative ml-2 py-1 pl-1.5 before:absolute before:top-0 before:-left-2 before:h-full before:w-px",
              {
                "text-primary before:bg-primary font-medium": item.href === active,
                "hover:before:bg-bg-300 hover:text-fg": item.href !== active,
              },
            )}
          >
            <button
              className="cursor-pointer"
              style={{
                marginLeft: `${(item.depth - 1) * 0.25}rem`,
              }}
              onClick={() => scrollTo(item.href)}
            >
              {item.value}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Toc;
