"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { account_navigation } from "@/config/account_navigation";
import { cn } from "@/lib/utils";

export function AccountNavbar() {
  const pathname = usePathname();
  if (!pathname.includes("/account")) {
    return null;
  }
  return (
    <div className="sticky top-[4rem] overflow-hidden overflow-y-auto z-50 bg-white dark:bg-neutral-950 flex items-center border-b dark:border-neutral-900 h-[3.5rem]">
      <ScrollArea className="w-[100vw]">
        <div className="container mx-auto overflow-hidden overflow-y-auto flex items-center gap-2">
          {account_navigation.map((item) => (
            <Button
              data-active={item.href === pathname ? "true" : "false"}
              key={item.name.toLowerCase()}
              left={item.icon}
              rounded="lg"
              size="sm"
              variant="ghost"
              className={cn(
                item.href === pathname
                  ? "bg-neutral-200 dark:bg-neutral-900"
                  : "hover:bg-neutral-200 dark:hover:bg-neutral-900"
              )}
              asChild
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <ScrollBar className="" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
