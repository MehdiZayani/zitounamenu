import { NextResponse } from "next/server";
import { fetchMenuSections } from "@/lib/menuService";

export const dynamic = "force-dynamic";

export async function GET() {
  const sections = await fetchMenuSections();
  return NextResponse.json({
    sections,
    source: "database",
  });
}
