import Image from "next/image";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { getAvatarLink } from "@/lib/avatar";
import cn from "@/lib/cn";
import config from "@data/config";

const { avatar } = config;
const link = getAvatarLink(avatar);

const OwnerAvatar = forwardRef<
  HTMLImageElement,
  Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt" | "fill" | "priority">
>(({ className, ...props }, ref) => (
  <div className="relative aspect-square size-full">
    <Image
      ref={ref}
      src={link}
      alt={avatar.alt}
      fill
      priority
      className={cn("mask mask-squircle object-cover", className)}
      {...props}
    />
  </div>
));
OwnerAvatar.displayName = "OwnerAvatar";

export default OwnerAvatar;
