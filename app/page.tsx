import SiteHeader from "@/components/custom/navbar";
import HeroSection from "@/components/custom/hero-section";
import CompanyProfile from "@/components/custom/profile";
import AboutIntro from "@/components/custom/intro";
import Footer from "@/components/custom/footer";
import NameAndLogo from "@/components/custom/name-logo";
import DesignProcess from "@/components/custom/design-process";
import ServicesCore from "@/components/custom/services-core";
import FoundersSection from "@/components/custom/archis";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <CompanyProfile />
      <AboutIntro />
      <NameAndLogo />
      <DesignProcess />
      <ServicesCore />
      <FoundersSection />
      <Footer />
    </main>
  );
}
