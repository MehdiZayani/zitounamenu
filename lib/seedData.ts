import prisma from "./prisma";
import { ensureDefaultAdmin } from "./auth";
import { initialMenuData } from "../data/initialMenu";

export async function seedDatabase(forceOverwrite = false) {
  await ensureDefaultAdmin();

  const productCount = await prisma.product.count();
  if (productCount > 0 && !forceOverwrite) {
    return {
      message: `Database already contains ${productCount} products. Seed skipped.`,
      count: productCount,
    };
  }

  if (forceOverwrite) {
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
  }

  let totalProducts = 0;

  for (let catIndex = 0; catIndex < initialMenuData.length; catIndex++) {
    const section = initialMenuData[catIndex];

    const category = await prisma.category.upsert({
      where: { slug: section.id },
      update: {
        label: section.label,
        subtitle: section.subtitle,
        order: catIndex,
      },
      create: {
        slug: section.id,
        label: section.label,
        subtitle: section.subtitle,
        order: catIndex,
      },
    });

    const left = section.leftItems || [];
    for (let i = 0; i < left.length; i++) {
      const item = left[i];
      await prisma.product.create({
        data: {
          title: item.title,
          price: item.price,
          description: item.description || "",
          extra: item.extra || "",
          side: "left",
          order: i,
          categoryId: category.id,
        },
      });
      totalProducts++;
    }

    const right = section.rightItems || [];
    for (let i = 0; i < right.length; i++) {
      const item = right[i];
      await prisma.product.create({
        data: {
          title: item.title,
          price: item.price,
          description: item.description || "",
          extra: item.extra || "",
          side: "right",
          order: i + 100,
          categoryId: category.id,
        },
      });
      totalProducts++;
    }
  }

  return {
    message: `Database successfully seeded with ${totalProducts} products across ${initialMenuData.length} categories.`,
    count: totalProducts,
  };
}
