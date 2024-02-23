import React from "react";
import styles from "./Loader.module.css";
function Loader() {
  return (
    <>
      <div className='d-flex justify-content-center vh-100 w-100 align-items-center'>
        <div className={styles.loader}></div>
      </div>
    </>
  );
}

export default Loader;
