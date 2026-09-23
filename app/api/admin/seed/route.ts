import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { seedDatabase } from "@/lib/seedData";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const force = Boolean(body?.force);

    const result = await seedDatabase(force);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Seed API error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation des données." },
      { status: 500 }
    );
  }
}
