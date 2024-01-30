import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "See current devices, update your password, enable or disable Two Factor Authentication (2FA).",
};
export default async function AccountSecurityPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Security</h2>
      <p className="text-neutral-500 text-sm">
        See current devices, update your password, enable or disable Two Factor
        Authentication (2FA).
      </p>
      <Separator />
    </div>
  );
}
