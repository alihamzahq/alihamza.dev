import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import JsonLd from '@/components/JsonLd';
import { siteMetadata } from '@/lib/constants';

// The canonical is set per page (not in the root layout) so that other routes,
// such as the 404 page, do not inherit a canonical pointing at the homepage.
export const metadata = {
  alternates: {
    canonical: siteMetadata.url,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
