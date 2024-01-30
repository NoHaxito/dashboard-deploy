import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preferences",
  description: "Set your preferred language and theme for the application.",
};

export default async function AccountPreferencesPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Preferences</h2>
      <p className="text-neutral-500 text-sm">
        Set your preferred language and theme for the application.
      </p>
      <Separator />
    </div>
  );
}
