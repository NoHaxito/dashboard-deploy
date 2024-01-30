import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await validateRequest();
  if (!session) {
    redirect("/auth/login");
  }
  return <>{children}</>;
}
