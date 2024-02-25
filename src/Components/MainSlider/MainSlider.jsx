import React from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../Project Assests/images/slider-image-1.jpeg";
import img2 from "../../Project Assests/images/slider-image-2.jpeg";
import img3 from "../../Project Assests/images/slider-image-3.jpeg";
function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: null, // Remove the previous arrow button
    nextArrow: null, // Remove the next arrow button
  };
  return (
    <>
      <div className='container'>
        {" "}
        <div className={`${styles.MainSlideR} `}>
          {" "}
          <div className='container my-5'>
            <div className='row gy-5 '>
              <div className='col-md-8 '>
                {" "}
                <Slider {...settings}>
                  <img src={img3} alt='' className='w-100' />
                  <img src={img1} alt='' className='w-100' />
                  <img src={img2} alt='' className='w-100' />
                </Slider>
              </div>
              <div className='col-md-4 '>
                <img src={img1} alt='' className='w-100' />
                <img src={img2} alt='' className='w-100' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSlider;
