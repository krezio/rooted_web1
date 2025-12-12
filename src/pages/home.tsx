import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Featured } from "@/components/home/Featured";
import { About } from "@/components/home/About";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Hero />
      <Featured />
      <About />
    </div>
  );
}
