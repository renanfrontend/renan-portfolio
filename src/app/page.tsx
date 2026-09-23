import { Cursor, Preloader, SmoothScroll } from "@/components/effects";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Stack } from "@/components/sections/Stack";

export default function Home() {
  return (
    <>
      <a href="#sobre" className="skip-link">
        Pular para o conteúdo
      </a>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Career />
        <Projects />
        <Services />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
