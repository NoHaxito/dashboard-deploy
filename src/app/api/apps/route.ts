import { execa } from "execa";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const appsArray = await getAllApps();
    return NextResponse.json(appsArray);
  } catch (error: any) {
    return NextResponse.json({ error: error.stderr });
  }
}

export async function getAllApps() {
  const { stdout } = await execa("docker", [
    "container",
    "ps",
    "-a",
    "--format",
    "json",
  ]);
  const appsArray = stdout
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line));
  return appsArray;
}
