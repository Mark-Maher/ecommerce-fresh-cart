import React from "react";
import styles from "./LayOut.module.css";
import {Outlet} from "react-router-dom";
import NavBar from "../NavBar/Header";
import Footer from "./../Footer/Footer";
import BtnScroll from "../BtnScroll/BtnScroll";
function LayOut() {
  return (
    <>
      <NavBar />
      <Outlet />
      <BtnScroll />
      <Footer />
    </>
  );
}

export default LayOut;
