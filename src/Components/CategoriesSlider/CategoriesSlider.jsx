import React, {useEffect, useState} from "react";
import styles from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import {useQuery} from "react-query";
import Loader from "../Loader/Loader";
function CategoriesSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // autoplay: true,
    // speed: 5000,
    // autoplaySpeed: Infinity,
    // cssEase: "linear",
  };
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let {data, isLoading, isError, error} = useQuery(
    "CategoriesSlider",
    getCategories
  );
  return (
    <>
      <div className='container'>
        <h2 className='fs-2 fw-bold  text-main pb-3'>
          Show Popular Catagories
        </h2>
        <Slider {...settings}>
          {isLoading && <Loader />}
          {data?.data.data.map((category, index) => {
            return (
              <div className='item px-1 my-5 mx-2' key={index}>
                <img
                  src={category.image}
                  alt=''
                  className={`w-100 ${styles.catImgSlider}`}
                  height={"250"}
                />
                <h6 className='text-center mt-2'>{category.name}</h6>
              </div>
            );
          })}
          {isError && <div className='alert alert-danger'>{error}</div>}
        </Slider>
      </div>
    </>
  );
}

export default CategoriesSlider;
