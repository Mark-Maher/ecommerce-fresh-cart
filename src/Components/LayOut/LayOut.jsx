import React from "react";
import styles from "./LayOut.module.css";
import {Outlet} from "react-router-dom";
import NavBar from "../NavBar/Header";
import Footer from "./../Footer/Footer";
function LayOut() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayOut;
