import { lucia, validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DeviceMobileCamera,
  Laptop,
  Monitor,
} from "@phosphor-icons/react/dist/ssr";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const { session } = await validateRequest();
  if (!session) {
    redirect("/auth/login");
  }
  const sessions = await lucia.getUserSessions(session.userId);
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Account</h2>
      <img src={session.avatar_url} className="size-32 rounded-full" />
      <section>
        <h3 className="text-xl font-bold">Current sessions</h3>
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-neutral-100 rounded-lg px-3 py-2 dark:bg-neutral-900 flex items-center gap-2">
            <Laptop className="size-12" />
            <div className="flex flex-col">
              <p className="text-sm font-medium">Windows</p>
              <span className="text-xs text-neutral-500">Chrome 121.0.0.0</span>
              <span className="text-xs text-neutral-500">
                192.168.0.0 (Tacna, PE)
              </span>
            </div>
            <div className="ml-auto">
              <Button rounded="xl" size="sm" variant="destructive">
                Revoke
              </Button>
            </div>
          </div>
          <div className="bg-neutral-100 rounded-lg px-3 py-2 dark:bg-neutral-900 flex items-center gap-2">
            <DeviceMobileCamera className="size-12" />
            <div className="flex flex-col">
              <p className="text-sm font-medium">Android</p>
              <span className="text-xs text-neutral-500">Chrome 121.0.0.0</span>
              <span className="text-xs text-neutral-500">
                192.168.0.0 (Lima, PE)
              </span>
            </div>
            <div className="ml-auto">
              <Button rounded="xl" size="sm" variant="destructive">
                Revoke
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
