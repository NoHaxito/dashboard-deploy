import { execa } from "execa";
import { revalidatePath } from "next/cache";

export async function getAllApps() {
  const { stdout } = await execa("docker", [
    "container",
    "ps",
    "-a",
    "--format",
    "json",
  ]);
  const appsArray = stdout
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line));
  return appsArray;
}

export async function getAppLogs(appId: string) {
  const { stdout } = await execa("docker", ["container", "logs", appId, "-t"]);

  return stdout;
}
export async function getApp(appId: string) {
  const { stdout } = await execa("docker", ["container", "inspect", appId]);

  return JSON.parse(stdout);
}
export async function startApp(appId: string) {
  try {
    const { stdout } = await execa("docker", ["container", "start", appId]);
    revalidatePath("/[appId]", "page");
    return { status: "starting", stdout };
  } catch (error: any) {
    return { status: "failed", error: error.stderr };
  }
}
export async function stopApp(appId: string) {
  try {
    const { stdout } = await execa("docker", ["container", "stop", appId]);
    revalidatePath("/[appId]", "page");
    return { status: "stopped", stdout };
  } catch (error: any) {
    return { status: "failed", error: error.stderr };
  }
}
export async function restartApp(appId: string) {
  try {
    const { stdout } = await execa("docker", ["container", "restart", appId]);
    revalidatePath("/[appId]", "page");
    return { status: "restarting", stdout };
  } catch (error: any) {
    return { status: "failed", error: error.stderr };
  }
}
export async function getAppStats(appId: string) {
  const { stdout } = await execa("docker", [
    "container",
    "stats",
    appId,
    "--format",
    "json",
    "--no-stream",
  ]);
  return stdout;
}
