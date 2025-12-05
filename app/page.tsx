import SiteHeader from "@/components/custom/navbar";
import HeroSection from "@/components/custom/hero-section";
import CompanyProfile from "@/components/custom/profile";
import AboutIntro from "@/components/custom/intro";
import Footer from "@/components/custom/footer";
import NameAndLogo from "@/components/custom/name-logo";
import DesignProcess from "@/components/custom/design-process";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <CompanyProfile />
      <AboutIntro />
      <NameAndLogo />
      <DesignProcess />
      <Footer />
    </main>
  );
}
