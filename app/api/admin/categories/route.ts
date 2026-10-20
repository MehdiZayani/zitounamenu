import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { error: "Impossible de charger les catégories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { label, subtitle, slug: customSlug } = body;

    if (!label || !label.trim()) {
      return NextResponse.json(
        { error: "Le nom de la catégorie est obligatoire" },
        { status: 400 }
      );
    }

    // Auto-generate slug from label if not provided
    const slug =
      customSlug?.trim() ||
      label
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Check uniqueness
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: `Une catégorie avec le slug "${slug}" existe déjà` },
        { status: 409 }
      );
    }

    // Determine the next order value
    const maxOrder = await prisma.category.aggregate({ _max: { order: true } });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const category = await prisma.category.create({
      data: {
        slug,
        label: label.trim(),
        subtitle: subtitle?.trim() || "Menu",
        order: nextOrder,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Category creation error:", error);
    return NextResponse.json(
      { error: "Impossible de créer la catégorie" },
      { status: 500 }
    );
  }
}
