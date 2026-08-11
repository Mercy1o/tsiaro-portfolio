import AboutPreview from "@/components/AboutPreview";
import ContactCTA from "@/components/ContactCTA";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SelectedWork from "@/components/SelectedWork";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SelectedWork />
        <AboutPreview />
        <ContactCTA />
      </main>
    </>
  );
}