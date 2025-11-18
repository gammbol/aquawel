import Image from "next/image";
import TopHeader from "@/app/components/TopHeader";
import BottomHeader from "@/app/components/BottomHeader";
import Hero from "@/app/components/Hero";
import Feedback from "@/app/components/Feedback";
import About from "@/app/components/About";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      <Hero />
      <About />
      <Feedback />
      <Footer />
    </>
  );
}
