import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Configure wich notifications you want to receive.",
};

export default async function AccountNotificationsPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <p className="text-neutral-500 text-sm">
        Configure wich notifications you want to receive.
      </p>
      <Separator />
    </div>
  );
}
