import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";
import { ProgressBarProvider } from "@/components/providers/progressbar-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { CircleHalf, User } from "@phosphor-icons/react/dist/ssr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// export const revalidate = 5;
// export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("relative", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBarProvider>
            <div className="relative flex min-h-screen flex-col dark:bg-neutral-950">
              <div className="relative flex-1">
                <Navbar />
                <div className="flex items-center border-b dark:border-neutral-900 h-[3.5rem]">
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
                <main className="container mx-auto py-4">{children}</main>
              </div>
            </div>
            <Toaster />
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
