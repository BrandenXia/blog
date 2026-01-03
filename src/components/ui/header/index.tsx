import Image from "next/image";
import Link from "next/link";

import { avatar, externalLinks, metadata } from "@/config";
import { getAvatarLink } from "@/lib/avatar";

const logoIcons = {
  github: "i-ph-github-logo",
};

const Header = () => {
  return (
    <nav className="mt-2.5 mr-9 ml-4 flex items-center">
      <Link
        href="/"
        className="flex transform-gpu items-center rounded-xl py-2.5 pr-5 pl-4 transition duration-250 hover:backdrop-brightness-[0.98] hover:backdrop-saturate-150"
      >
        <Image
          src={getAvatarLink(avatar)}
          width={128}
          height={128}
          alt={avatar.alt}
          className="mask mask-squircle mr-4 size-11"
        />
        <span
          className="text-fg-200 text-xl font-semibold tracking-wide"
          style={{ fontFamily: "cursive" }}
        >
          {metadata.title.default}
        </span>
      </Link>
      <div className="grow" />
      {Object.entries(externalLinks).map(([key, link]) => (
        <Link key={key} href={link} target="_blank" className="size-[1.95rem]" aria-label={key}>
          <span className={`${logoIcons[key as keyof typeof logoIcons]} size-[1.95rem]`} />
        </Link>
      ))}
    </nav>
  );
};

export default Header;
