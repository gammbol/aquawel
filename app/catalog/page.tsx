import BottomHeader from "@/app/components/BottomHeader";
import CatalogPage from "@/app/catalog/components/CatalogPage";
import Footer from "@/app/components/Footer";
import TopHeader from "@/app/components/TopHeader";

export const metadata = {
  title: "Каталог мебели | Aquawel",
  description: "Интернет-каталог мебели для ванной комнаты Aquawel",
};

export default function Catalog() {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      <CatalogPage />
      <Footer />
    </>
  );
}
