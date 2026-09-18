"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const src = mounted && resolvedTheme === "dark" && darkSrc ? darkSrc : lightSrc;

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}