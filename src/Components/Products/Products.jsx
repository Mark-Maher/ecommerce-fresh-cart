import React, {useEffect} from "react";
import styles from "./Products.module.css";
import {Helmet} from "react-helmet";
import FeatureProducts from "./../featureProducts/featureProducts";
import {useLocation} from "react-router-dom";
function Products() {
  // const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {" "}
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      <FeatureProducts />
    </>
  );
}

export default Products;
