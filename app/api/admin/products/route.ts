import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    const where: any = {};

    if (categoryId && categoryId !== "all") {
      where.categoryId = categoryId;
    }

    if (search && search.trim() !== "") {
      const q = search.trim();
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { extra: { contains: q, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { category: { order: "asc" } },
        { order: "asc" },
        { title: "asc" },
      ],
      include: {
        category: {
          select: {
            id: true,
            slug: true,
            label: true,
          },
        },
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { error: "Impossible de charger les produits" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { title, price, description, extra, categoryId, side } = body;

    if (!title || !price || !categoryId) {
      return NextResponse.json(
        { error: "Le titre, le prix et la catégorie sont obligatoires." },
        { status: 400 }
      );
    }

    // Determine the highest order number in this category
    const lastProduct = await prisma.product.findFirst({
      where: { categoryId },
      orderBy: { order: "desc" },
    });
    const nextOrder = (lastProduct?.order ?? 0) + 1;

    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        price: price.trim(),
        description: description ? description.trim() : "",
        extra: extra ? extra.trim() : "",
        side: side === "right" ? "right" : "left",
        order: nextOrder,
        isAvailable: true,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}
