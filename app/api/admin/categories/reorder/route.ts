import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { categoryIds } = body;

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return NextResponse.json(
        { error: "Liste d'identifiants de catégories invalide" },
        { status: 400 }
      );
    }

    // Update order of each category in a transaction
    await prisma.$transaction(
      categoryIds.map((id: string, index: number) =>
        prisma.category.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    const updatedCategories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      categories: updatedCategories,
    });
  } catch (error) {
    console.error("Categories reorder error:", error);
    return NextResponse.json(
      { error: "Impossible de modifier l'ordre des catégories" },
      { status: 500 }
    );
  }
}
