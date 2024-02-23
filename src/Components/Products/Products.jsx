import React from "react";
import styles from "./Products.module.css";
import {Helmet} from "react-helmet";
import FeatureProducts from "./../featureProducts/featureProducts";
function Products() {
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
