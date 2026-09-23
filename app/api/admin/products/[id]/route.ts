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
    const { title, price, description, extra, categoryId, side, isAvailable } = body;

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title.trim();
    if (price !== undefined) dataToUpdate.price = price.trim();
    if (description !== undefined) dataToUpdate.description = description.trim();
    if (extra !== undefined) dataToUpdate.extra = extra.trim();
    if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
    if (side !== undefined) dataToUpdate.side = side;
    if (isAvailable !== undefined) dataToUpdate.isAvailable = Boolean(isAvailable);

    const updated = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
      include: { category: true },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du produit" },
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
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du produit" },
      { status: 500 }
    );
  }
}
