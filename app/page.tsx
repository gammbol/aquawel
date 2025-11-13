import Image from "next/image";
import TopHeader from "@/app/components/TopHeader";
import BottomHeader from "@/app/components/BottomHeader";
import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      <Hero />
    </>
  );
}
