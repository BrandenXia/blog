import cn from "@/lib/cn";

import type { ElementLike } from "@/types/utils";
import type { MDXComponents } from "mdx/types";

const headingStyles = "pt-4 pb-1.5 font-semibold";

const h1: ElementLike<"h1"> = (props) => <h1 {...props} className={`text-2xl ${headingStyles}`} />;

const h2: ElementLike<"h2"> = (props) => <h2 {...props} className={`text-xl ${headingStyles}`} />;

const h3: ElementLike<"h3"> = (props) => <h3 {...props} className={`text-lg ${headingStyles}`} />;

const h4: ElementLike<"h4"> = (props) => (
  <h4 {...props} className={`text-[1.05rem] ${headingStyles}`} />
);
const h5 = h4;
const h6 = h4;

// `data-[theme*='_']:something`` selects code block ```...``` in markdown
// `not-data-[theme*='_']:something`` selects inline `...` in markdown
const code: ElementLike<"code"> = (props) => (
  <code
    {...props}
    className={cn(
      // common styles
      "font-mono",
      // inline code styles
      "not-data-[theme*='_']:bg-bg-100 not-data-[theme*='_']:rounded-xl not-data-[theme*='_']:px-1.5",
      // block code styles
      "data-[theme*='_']:mx-4 data-[theme*='_']:overflow-x-auto data-[theme*='_']:py-3 data-[theme*='_']:[scrollbar-width:none]",
    )}
  />
);

const MdxStyles = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  code,
} satisfies MDXComponents;

export default MdxStyles;
