import Image from "next/image";
import type { ImageProps } from "next/image";
import { PHOTOS } from "@/config/images";

type PhotoProps = Omit<ImageProps, "src" | "placeholder"> & { src: string };

/** next/image with an automatic blurred placeholder for registered photos. */
export function Photo({ src, ...props }: PhotoProps) {
  const data = PHOTOS[src];
  return <Image src={data ?? src} placeholder={data ? "blur" : "empty"} {...props} />;
}
