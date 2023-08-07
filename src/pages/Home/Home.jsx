import React from "react";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import FeatureItems from "../../components/FeatureComponents/FeatureItems";
import BannerSection from "../../components/FeatureComponents/BannerSection/BannerSection";
import "./home.css"

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <BannerSection />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItems />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
