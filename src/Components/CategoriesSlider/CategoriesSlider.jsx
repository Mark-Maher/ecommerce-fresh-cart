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
    prevArrow: null, // Remove the previous arrow button
    nextArrow: null, // Remove the next arrow button
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
      <div className='container mb-5 '>
        <h2 className='fs-2 fw-bold  subtitleName pb-3  animate__animated animate__fadeInUpBig'>
          Show Popular Catagories
        </h2>
        <Slider {...settings}>
          {isLoading && <Loader />}
          {data?.data.data.map((category, index) => {
            return (
              <div
                className='item px-1 my-5 mx-2  '
                // data-aos='fade-right'
                key={index}
              >
                <img
                  src={category.image}
                  alt=''
                  className={`w-100 ${styles.catImgSlider}`}
                  height={"250"}
                />
                <h6 className='text-center mt-4 subtitleName fw-bold'>
                  {category.name}
                </h6>
              </div>
            );
          })}
          {isError && <div className='alert alert-danger'>{error}</div>}
        </Slider>
      </div>
      <div className='container'>
        {" "}
        <section className='main-info  mt-5 mb-0'>
          <div className='container '>
            <div className='row gy-3 '>
              <div
                className='col-md-6 col-lg-3 '
                // data-aos='fade-right'
                // data-aos-duration='1000'
              >
                <div className='text-main '>
                  <i className='fa-solid fa-truck'></i>
                  <div className='main-text'>
                    <h3>FREE DELIVERY</h3>
                    <span>
                      Consectetur adipi elit lorem ipsum dolor sit amet.
                    </span>
                  </div>
                </div>
              </div>
              <div
                className='col-md-6 col-lg-3 '
                // data-aos='fade-down'
                // data-aos-duration='1000'
              >
                <div className='text-main'>
                  <i className='fa-solid fa-award'></i>
                  <div className='main-text'>
                    <h3>QUALITY GUARANTEE</h3>
                    <span>
                      Dolor sit amet orem ipsu mcons ectetur adipi elit.
                    </span>
                  </div>
                </div>
              </div>
              <div
                className='col-md-6 col-lg-3 '
                // data-aos='fade-up'
                // data-aos-duration='1000'
              >
                <div className='text-main'>
                  <i className='fa-solid fa-shield-halved'></i>
                  <div className='main-text'>
                    <h3>100% SECURE PAYMENT</h3>
                    <span>
                      Rem Lopsum dolor sit amet, consectetur adipi elit.
                    </span>
                  </div>
                </div>
              </div>
              <div
                className='col-md-6 col-lg-3 '
                // data-aos='fade-left'
                // data-aos-duration='1000'
              >
                <div className='text-main'>
                  <i className='fa-solid fa-coins'></i>
                  <div className='main-text'>
                    <h3>DAILY OFFERS</h3>
                    <span>
                      Amet consectetur adipi elit loreme ipsum dolor sit.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CategoriesSlider;
