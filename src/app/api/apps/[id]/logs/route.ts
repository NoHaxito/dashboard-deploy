import { execa } from "execa";
import { NextResponse } from "next/server";

export default async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stdout = await getAppLogs(params.id);
    return NextResponse.json(stdout);
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}

export async function getAppLogs(appId: string) {
  const { stdout } = await execa("docker", ["container", "logs", appId, "-t"]);

  return stdout;
}
