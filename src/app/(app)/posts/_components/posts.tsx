"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import type { Metadata } from "@/lib/posts";
import type { FC } from "react";

const Posts: FC<{ posts: Metadata[] }> = ({ posts }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ul className="flex flex-col">
      <AnimatePresence initial={false}>
        {posts.map((p) => (
          <Link key={p.title} href={`/posts/${encodeURIComponent(p.title)}`}>
            <li
              className="relative px-5 py-4"
              onMouseEnter={() => setActiveId(p.title)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div className="text-lg font-semibold">{p.title}</div>
              <ul className="text-secondary space-x-2.5">
                {p.tags.map((tag) => (
                  <li key={tag} className="inline text-[0.85rem] before:content-['#']">
                    {tag}
                  </li>
                ))}
              </ul>
              <time className="text-fg-200 absolute top-4 right-5 text-[0.9rem]">{p.date}</time>
              {activeId === p.title && (
                <m.div
                  layoutId="posts-background"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  {...{ className: "absolute inset-0 -z-10 md:rounded-xl backdrop-brightness-95" }}
                />
              )}
            </li>
          </Link>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default Posts;
