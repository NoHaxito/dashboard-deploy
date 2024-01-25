import { getApp } from "@/services/app";
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
