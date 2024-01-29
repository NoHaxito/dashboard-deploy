import { lucia, validateRequest } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const { session } = await validateRequest();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const sessions = await lucia.getUserSessions(session.userId);
  return NextResponse.json({ sessions });
}
