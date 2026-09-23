import { Cursor, SmoothScroll } from "@/components/effects";
import { Contact } from "@/components/sections/Contact";
import { LastRole } from "@/components/sections/LastRole";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <LastRole />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
