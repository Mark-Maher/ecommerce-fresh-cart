import React from "react";
import styles from "./NotFound.module.css";
import notFound from "../../Project Assests/images/error.svg";
function NotFound() {
  return (
    <div className='container my-5'>
      <img src={notFound} alt='notFound-img' className='w-100' />
    </div>
  );
}

export default NotFound;
