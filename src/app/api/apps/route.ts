import { getAllApps } from "@/services/app";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const appsArray = await getAllApps();
    return NextResponse.json(appsArray);
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}
