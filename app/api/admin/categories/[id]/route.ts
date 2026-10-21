import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { label, subtitle, order, slug } = body;

    const dataToUpdate: any = {};
    if (label !== undefined && label.trim()) dataToUpdate.label = label.trim();
    if (subtitle !== undefined) dataToUpdate.subtitle = subtitle.trim();
    if (order !== undefined) dataToUpdate.order = Number(order);
    if (slug !== undefined && slug.trim()) dataToUpdate.slug = slug.trim();

    const category = await prisma.category.update({
      where: { id },
      data: dataToUpdate,
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Category update error:", error);
    return NextResponse.json(
      { error: "Impossible de modifier la catégorie" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Category delete error:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer la catégorie" },
      { status: 500 }
    );
  }
}
