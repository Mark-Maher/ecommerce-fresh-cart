import React from "react";
import styles from "./Home.module.css";
import MainSlider from "./../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import {Helmet} from "react-helmet";
import FeatureProducts from "../featureProducts/featureProducts";
import OurClients from "../OurClients/OurClients";
import TrendingProducts from "../TrendingProducts/TrendingProducts";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <FeatureProducts />
      <OurClients />
    </>
  );
}

export default Home;
