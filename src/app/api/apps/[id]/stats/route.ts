import { getAppStats } from "@/services/app";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stdout = await getAppStats(params.id);
    revalidatePath(`/${params.id}`);
    return NextResponse.json(JSON.parse(stdout));
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}
