import { getApp } from "@/services/app";

import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
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
