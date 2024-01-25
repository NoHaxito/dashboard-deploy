import { startApp } from "@/services/app";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const start = await startApp(params.id);
    return NextResponse.json(start);
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}
