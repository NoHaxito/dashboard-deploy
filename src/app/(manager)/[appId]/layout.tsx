import { ActionButtons } from "@/components/apps/action-buttons";
import { UptimeCounter } from "@/components/apps/uptime-counter";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DotOutline } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

// export const dynamic = "force-dynamic";

async function fetchApp(appId: string) {
  try {
    const req = await fetch(
      "https://console.nohaxito.xyz/api/apps/" + appId
    );
    const res: any = await req.json();
    if (res.error) {
      return { error: res.error };
    }
    return { app: res[0] };
  } catch (error: any) {
    return { error: error.stderr };
  }
}
export default async function AppLayout({
  children,
  params,
  console,
}: {
  children: React.ReactNode;
  params: { appId: string };
  console: React.ReactNode;
}) {
  const { app, error } = await fetchApp(params.appId);
  if (error) {
    throw new Error(error);
  }
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
      <Tabs defaultValue="logs">
        <TabsList>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="logs">{console}</TabsContent>
        <TabsContent value="settings">Settings page</TabsContent>
      </Tabs>
      {children}
    </div>
  );
}
