import { restartApp } from "@/services/app";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const restart = await restartApp(params.id);
    return NextResponse.json(restart);
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}
