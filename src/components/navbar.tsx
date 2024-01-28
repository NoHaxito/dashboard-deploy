import { Cards, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { validateRequest } from "@/auth";
import { Button } from "./ui/button";
import { UserMenu } from "./user-menu";

export async function Navbar() {
  const { session } = await validateRequest();

  return (
    <header className="border-b sticky border-neutral-200 bg-white dark:bg-neutral-950 top-0 z-50 flex items-center dark:border-neutral-900 h-[4rem]">
      <div className="container flex items-center justify-between gap-2 mx-auto">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <Cards weight="fill" className="size-8" />
          Docker Manager
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session !== null ? (
            <UserMenu>
              <img src={session?.avatar_url} className="rounded-full size-8" />
            </UserMenu>
          ) : (
            <Button left={<GithubLogo />} rounded="lg" className="h-8" asChild>
              <Link href="/api/auth/github">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
