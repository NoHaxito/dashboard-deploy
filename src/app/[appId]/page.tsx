import { DotOutline } from "@phosphor-icons/react/dist/ssr";
import { getApp } from "../api/apps/[id]/route";
import { cn } from "@/lib/utils";
import { ActionButtons } from "@/components/apps/action-buttons";
import { getAppLogs } from "../api/apps/[id]/logs/route";
import { UptimeCounter } from "@/components/apps/uptime-counter";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AppLogs } from "@/components/apps/app-logs";

export const revalidate = 5;
export const dynamic = "force-dynamic";

export default async function AppPage({
  params,
}: {
  params: { appId: string };
}) {
  const app = ((await getApp(params.appId)) as any[])[0];
  const appLogs = app.State.Running ? await getAppLogs(params.appId) : null;

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <div className="flex items-center gap-1">
          <DotOutline
            weight="fill"
            className={cn(
              app.State.Status === "running" && "text-green-500",
              app.State.Status === "exited" && "text-red-500",
              app.State.Status === "paused" && "text-gray-500",
              "h-10 w-10"
            )}
          />
          <h1 className="font-bold text-xl">{app.Name.replace("/", "")}</h1>
          {app.State.Running && (
            <UptimeCounter uptimeDate={app.State.StartedAt} />
          )}
        </div>
        <div className="space-y-1">
          <span>
            <Link
              href={`https://${app.Name.replace("/", "")}.deploy.nohaxito.xyz`}
              target="_blank"
              className="text-neutral-500 hover:underline"
              rel="noreferrer"
            >
              {`https://${app.Name.replace("/", "")}.deploy.nohaxito.xyz`}
            </Link>
          </span>
        </div>
      </div>
      <Separator />
      <ActionButtons app={app} />
      <div className="space-y-2">
        <h3 className="text-md font-medium">Console (logs)</h3>
        <AppLogs logs={appLogs} />
      </div>
    </div>
  );
}
