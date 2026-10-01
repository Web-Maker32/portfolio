"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type ThemeImageProps = {
  lightSrc?: string;
  darkSrc?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  sizes,
  priority = false,
  className = "object-cover object-top",
}: ThemeImageProps) {
  useTheme();
  const lightImage = lightSrc ?? darkSrc;
  if (!lightImage) return null;

  const image = (src: string, imageClassName: string, imageAlt = alt) => (
    <Image
      src={src}
      alt={imageAlt}
      fill
      sizes={sizes}
      priority={priority}
      className={imageClassName}
    />
  );

  if (!darkSrc || darkSrc === lightImage) return image(lightImage, className);

  return (
    <>
      {image(lightImage, `dark:hidden ${className}`)}
      {image(darkSrc, `hidden dark:block ${className}`, "")}
    </>
  );
}