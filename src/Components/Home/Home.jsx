import React, {useContext, useEffect} from "react";
import styles from "./Home.module.css";
import MainSlider from "./../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import {Helmet} from "react-helmet";
import FeatureProducts from "../featureProducts/featureProducts";
import OurClients from "../OurClients/OurClients";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import {cartContext} from "../../Context/CartContext";

function Home() {
  const {getCart, getToWishlist} = useContext(cartContext);
  useEffect(() => {
    getCart();
    getToWishlist();
    window.scrollTo(0, 0);
  }, []);
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
