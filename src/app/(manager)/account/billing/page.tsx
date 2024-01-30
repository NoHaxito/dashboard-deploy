import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
  description: "See your billing details and edit your suscription.",
};
export default async function AccountBillingPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Billing</h2>
      <p className="text-neutral-500 text-sm">
        See your billing details and edit your suscription.
      </p>
      <Separator />
    </div>
  );
}
