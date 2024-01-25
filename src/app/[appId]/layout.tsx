import { ActionButtons } from "@/components/apps/action-buttons";
import { UptimeCounter } from "@/components/apps/uptime-counter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getApp, getAppLogs } from "@/services/app";
import { DotOutline } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function AppLayout({
  children,
  params,
  console,
}: {
  children: React.ReactNode;
  params: { appId: string };
  console: React.ReactNode;
}) {
  const app = ((await getApp(params.appId)) as any[])[0];

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
      {console}
      {children}
    </div>
  );
}
