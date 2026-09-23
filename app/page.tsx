import { fetchMenuSections } from "@/lib/menuService";
import MenuGallery from "./MenuGallery";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sections = await fetchMenuSections();
  return <MenuGallery initialData={sections} />;
}
