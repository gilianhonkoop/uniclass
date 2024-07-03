"use client";

import { usePathname } from "next/navigation";

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CurrentPage() {
  const pathname: string = usePathname();
  return capitalizeFirst(pathname.split("/").at(-1)!);
}
