import { Cursor, SmoothScroll } from "@/components/effects";
import { Contact } from "@/components/sections/Contact";
import { CurrentRole } from "@/components/sections/CurrentRole";
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
        <CurrentRole />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
