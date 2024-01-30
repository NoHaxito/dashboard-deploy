import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProgressBarProvider } from "@/components/providers/progressbar-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { AccountNavbar } from "@/components/account-navbar";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Docker Manager",
    template: `%s - Docker Manager`,
  },
  description:
    "Deploy applications easily with one click. Get started for free, no credit card required.",
};

// export const revalidate = 5;
export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await validateRequest();
  if (!session) {
    redirect("/auth/login");
  }
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
                <AccountNavbar />
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
