import { getAppLogs } from "@/services/app";
import { execa } from "execa";
import { NextResponse } from "next/server";

export async function GET(
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
