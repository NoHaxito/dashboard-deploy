import { NextResponse } from "next/server";
import { restartApp } from "../route";

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
