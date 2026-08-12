import Hero from "@/components/Hero";
import PortfolioGateway from "@/components/PortfolioGateway";
import AboutPreview from "@/components/AboutPreview";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <PortfolioGateway />
      <AboutPreview />
      <ContactCTA />
    </main>
  );
}
