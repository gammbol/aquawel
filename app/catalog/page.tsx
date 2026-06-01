import BottomHeader from "@/app/components/BottomHeader";
import CatalogPage from "@/app/catalog/components/CatalogPage";
import Footer from "@/app/components/Footer";
import TopHeader from "@/app/components/TopHeader";

export const metadata = {
  title: "Каталог мебели | Aquawel",
  description: "Коллекции мебели Aquawel для розничных клиентов, дизайнеров и застройщиков",
};

export default function Catalog() {
  return (
    <>
      <TopHeader />
      <BottomHeader showActions={false} />
      <CatalogPage />
      <Footer />
    </>
  );
}
