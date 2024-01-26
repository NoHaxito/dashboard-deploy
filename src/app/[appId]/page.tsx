import { getApp, getAppLogs } from "@/services/app";

async function getAppDetails(appId: string) {
  try {
    const app = ((await getApp(appId)) as any[])[0];
    const appLogs = app.State.Running ? await getAppLogs(appId) : null;
    return { app, logs: appLogs };
  } catch (error: any) {
    return { error: error.stderr };
  }
}

export default async function AppPage({
  params,
}: {
  params: { appId: string };
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-md font-medium">Environment Variables</h3>
      {/* <AppLogs logs={appLogs} /> */}
    </section>
  );
}
