"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { CircleHalf, User } from "@phosphor-icons/react";

export function AccountNavbar() {
  const pathname = usePathname();
  if (!pathname.includes("/account")) {
    return null;
  }
  return (
    <div className="sticky top-[4rem] z-50 bg-white dark:bg-neutral-950 flex items-center border-b dark:border-neutral-900 h-[3.5rem]">
      <div className="container mx-auto flex items-center gap-2">
        <Button
          left={<User weight="fill" />}
          rounded="lg"
          size="sm"
          variant="ghost"
          className="bg-neutral-200 dark:bg-neutral-900"
          asChild
        >
          <Link href="/account">Account</Link>
        </Button>

        <Button
          left={<CircleHalf weight="fill" />}
          rounded="lg"
          size="sm"
          variant="ghost"
          asChild
        >
          <Link href="/account">Preferences</Link>
        </Button>
      </div>
    </div>
  );
}
