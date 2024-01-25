import { AppLogs } from "@/components/apps/app-logs";
import { AppUsage } from "@/components/apps/app-usage";
import { getApp, getAppLogs } from "@/services/app";

export default async function ConsoleLogs({
  params,
}: {
  params: { appId: string };
}) {
  const app = ((await getApp(params.appId)) as any[])[0];
  const appLogs = app.State.Running ? await getAppLogs(params.appId) : null;
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium">Console (Logs)</h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
        <AppLogs logs={appLogs} />
        <div className="grid grid-cols-1 gap-y-2 col-span-1">
          <AppUsage />
        </div>
      </div>
    </section>
  );
}
