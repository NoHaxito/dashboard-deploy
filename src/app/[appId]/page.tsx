import { DotOutline } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { ActionButtons } from "@/components/apps/action-buttons";
import { UptimeCounter } from "@/components/apps/uptime-counter";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AppLogs } from "@/components/apps/app-logs";
import { getApp, getAppLogs } from "@/services/app";

export default async function AppPage({
  params,
}: {
  params: { appId: string };
}) {
  const app = ((await getApp(params.appId)) as any[])[0];
  const appLogs = app.State.Running ? await getAppLogs(params.appId) : null;

  return (
    <section className="space-y-2">
      <h3 className="text-md font-medium">Environment Variables</h3>
      {/* <AppLogs logs={appLogs} /> */}
    </section>
  );
}
