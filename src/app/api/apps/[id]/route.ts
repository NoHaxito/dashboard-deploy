import { execa } from "execa";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const app = await getApp(params.id);
    return NextResponse.json(app);
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}

export async function getApp(appId: string) {
  const { stdout } = await execa("docker", ["container", "inspect", appId]);
  //   const appsArray = stdout
  //     .split("\n")
  //     .filter((line) => line.trim() !== "")
  //     .map((line) => JSON.parse(line));
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
