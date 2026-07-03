import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SportsSection from "../components/SportsSection";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import DownloadApp from "../components/DownloadApp";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SportsSection />
      <FeaturesSection />
      <StatsSection />
      <DownloadApp />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;