import React from "react";
import styles from "./Loader.module.css";
function Loader() {
  return (
    <>
      <div className='d-flex justify-content-center vh-100 w-100 align-items-center '>
        <div className={styles.loader}>
          {" "}
          {/* <p className='text-dark fw-bold display-1'>FreshCart</p> */}
        </div>
      </div>
    </>
  );
}

export default Loader;
