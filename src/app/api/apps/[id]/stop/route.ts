import { NextResponse } from "next/server";
import { stopApp } from "../route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stop = await stopApp(params.id);
    return NextResponse.json(stop);
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}
