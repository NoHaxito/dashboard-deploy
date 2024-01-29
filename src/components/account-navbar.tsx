"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Bell, CircleHalf, Shield, User } from "@phosphor-icons/react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function AccountNavbar() {
  const pathname = usePathname();
  if (!pathname.includes("/account")) {
    return null;
  }
  return (
    <div className="sticky top-[4rem] overflow-hidden overflow-y-auto z-50 bg-white dark:bg-neutral-950 flex items-center border-b dark:border-neutral-900 h-[3.5rem]">
      <ScrollArea className="w-[100vw]">
        <div className="container mx-auto overflow-hidden overflow-y-auto flex items-center gap-2">
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
            left={<Shield weight="fill" />}
            rounded="lg"
            size="sm"
            variant="ghost"
            className="hover:bg-neutral-200 dark:hover:bg-neutral-900"
            asChild
          >
            <Link href="/account">Security</Link>
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
          <Button
            left={<Bell weight="fill" />}
            rounded="lg"
            size="sm"
            variant="ghost"
            asChild
          >
            <Link href="/account">Notifications</Link>
          </Button>
        </div>
        <ScrollBar className="" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
