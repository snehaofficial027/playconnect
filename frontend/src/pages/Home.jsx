import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SportsSection from "../components/SportsSection";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import DownloadApp from "../components/DownloadApp";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";


function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, []);
  
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