import Link from "next/link";

import DialogImg from "@/components/ui/dialog-img";

import { pre } from "./client";
import style from "./mdx-style.module.css";

import type { ElementLike } from "@/types/utils";
import type { MDXComponents } from "mdx/types";

const headingStyle =
  "relative before:absolute before:-left-8 before:opacity-30 hover:before:content-['#'] pt-5";

const h1: ElementLike<"h1"> = ({ children, ...props }) => (
  <h1 {...props} className={`text-3xl font-bold ${headingStyle}`}>
    <Link href={`#${children}`}>{children}</Link>
  </h1>
);
const h2: ElementLike<"h2"> = ({ children, ...props }) => (
  <h2 {...props} className={`text-2xl font-bold ${headingStyle}`}>
    <Link href={`#${children}`}>{children}</Link>
  </h2>
);
const h3: ElementLike<"h3"> = ({ children, ...props }) => (
  <h3 {...props} className={`text-xl font-bold ${headingStyle}`}>
    <Link href={`#${children}`}>{children}</Link>
  </h3>
);
const h4: ElementLike<"h4"> = ({ children, ...props }) => (
  <h4 {...props} className={`text-lg font-bold ${headingStyle}`}>
    <Link href={`#${children}`}>{children}</Link>
  </h4>
);
const headingStyles = { h1, h2, h3, h4 };

const p: ElementLike<"p"> = ({ children, ...props }) => (
  <p {...props} className="leading-7">
    {children}
  </p>
);

const a: ElementLike<"a"> = ({ children, href, ...props }) => (
  <a
    {...props}
    href={href}
    className="text-primary underline"
    target={href?.includes("http") ? "_blank" : "_self"}
  >
    {children}
    {href?.includes("http") && <span className="i-ph-arrow-up-right size-4 align-middle" />}
  </a>
);

const blockquote: ElementLike<"blockquote"> = ({ children, ...props }) => (
  <blockquote
    {...props}
    className="border-l-4 border-info bg-info/20 px-5 py-4 font-medium text-info-content"
  >
    {children}
  </blockquote>
);

const code: ElementLike<"code"> = ({ children, ...props }) => (
  <code {...props} className={`overflow-auto ${style.code}`}>
    {children}
  </code>
);

const ol: ElementLike<"ol"> = ({ children, ...props }) => (
  <ol
    {...props}
    className="list-inside list-decimal [&_ol]:list-upper-alpha [&_ol_ol]:list-lower-alpha [&_ol_ol_ol]:list-upper-roman [&_ol_ol_ol_ol]:list-lower-roman"
  >
    {children}
  </ol>
);
const ul: ElementLike<"ul"> = ({ children, ...props }) => (
  <ul {...props} className="list-inside list-disc">
    {children}
  </ul>
);
const li: ElementLike<"li"> = ({ children, ...props }) => (
  <li {...props} className="leading-7 [&_li]:ml-5">
    {children}
  </li>
);
const listStyles = { ol, ul, li };

const img: ElementLike<"img"> = ({ src, alt: metas, ...props }) => {
  const alt = metas?.replace(/ *\(.*\) */g, "");
  const caption = metas?.match(/\(caption: *(.*?)\)/)?.pop();

  return (
    <span className="block space-y-4 py-8">
      <DialogImg {...props} src={src} alt={alt} className="mx-auto w-4/5" />
      {caption && <span className="block text-center text-sm text-neutral/75">{caption}</span>}
    </span>
  );
};

const table: ElementLike<"table"> = ({ children, ...props }) => (
  <table {...props} className="w-full border-collapse border border-neutral/10">
    {children}
  </table>
);
const thead: ElementLike<"thead"> = ({ children, ...props }) => (
  <thead {...props} className="bg-neutral/10">
    {children}
  </thead>
);
const tbody: ElementLike<"tbody"> = ({ children, ...props }) => (
  <tbody {...props} className="divide-y divide-neutral/10">
    {children}
  </tbody>
);
const tr: ElementLike<"tr"> = ({ children, ...props }) => (
  <tr {...props} className="divide-x divide-neutral/10">
    {children}
  </tr>
);
const th: ElementLike<"th"> = ({ children, ...props }) => (
  <th {...props} className="px-4 py-2 text-left font-medium">
    {children}
  </th>
);
const td: ElementLike<"td"> = ({ children, ...props }) => (
  <td {...props} className="px-4 py-2">
    {children}
  </td>
);
const tableStyles = {
  table,
  thead,
  tbody,
  tr,
  th,
  td,
};

const MdxStyle = {
  ...headingStyles,
  p,
  a,
  blockquote,
  code,
  pre,
  ...listStyles,
  img,
  ...tableStyles,
} as MDXComponents;

export default MdxStyle;
