"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ArrowSquareOut,
  Book,
  Lifebuoy,
  SignOut,
  User,
  CreditCard,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";
import Link from "next/link";

export function UserMenu({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button rounded="full" size="icon" className="size-8">
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" rounded="xl" align="end">
        <DropdownMenuItem asChild rounded="xl" left={<User />}>
          <Link href="/account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild rounded="xl" left={<CreditCard />}>
          <Link href="/account/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          rounded="xl"
          left={<Book />}
          right={<ArrowSquareOut weight="fill" />}
        >
          Docs
        </DropdownMenuItem>
        <DropdownMenuItem rounded="xl" left={<Lifebuoy />}>
          Help
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild rounded="xl" left={<SignOut />}>
          <Link href="/api/auth/logout">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
