import prisma from "./prisma";
import { initialMenuData, MenuSection } from "@/data/initialMenu";

export async function fetchMenuSections(): Promise<MenuSection[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        products: {
          where: { isAvailable: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!categories || categories.length === 0) {
      return initialMenuData;
    }

    const sections: MenuSection[] = categories.map((cat) => {
      const leftItems = cat.products
        .filter((p) => p.side !== "right")
        .map((p) => ({
          title: p.title,
          price: p.price,
          description: p.description || "",
          extra: p.extra || undefined,
        }));

      const rightItems = cat.products
        .filter((p) => p.side === "right")
        .map((p) => ({
          title: p.title,
          price: p.price,
          description: p.description || "",
          extra: p.extra || undefined,
        }));

      return {
        id: cat.slug,
        label: cat.label,
        subtitle: cat.subtitle || "Menu",
        leftItems,
        rightItems,
      };
    });

    return sections;
  } catch (error) {
    console.error("fetchMenuSections error:", error);
    return initialMenuData;
  }
}
