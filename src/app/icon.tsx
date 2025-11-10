import { ImageResponse } from "next/og";

import { avatar } from "@/config";
import { getAvatarLink } from "@/lib/avatar";

const size = { width: 64, height: 64 };
const contentType = "image/png";

const link = getAvatarLink(avatar);

const OwnerAvatar = () =>
  // Next.js Image component is not supported in Open Graph images

  new ImageResponse(<img tw="rounded-full" src={link} alt={avatar.alt} />, { ...size });

export { size, contentType };
export default OwnerAvatar;
