import { NextResponse } from "next/server";
import { fetchProjects } from "@/lib/projects";

export async function GET() {
  const result = await fetchProjects();
  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { projects: result.projects },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
