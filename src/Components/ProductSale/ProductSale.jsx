import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";

import styles from "./ProductSale.module.css";
function ProductSale() {
  // const countDown = () => {
  //   const selectedTime = new Date("Jan 25, 2024");

  //   const updateCountdown = () => {
  //     const now = new Date().getTime();
  //     const difference = selectedTime - now;

  //     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor(
  //       (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  //     if (difference < 0) {
  //       clearInterval(interval);
  //     } else {
  //       setDays(days);
  //       setHours(hours);
  //       setMinutes(minutes);
  //       setSeconds(seconds);
  //     }
  //   };

  //   updateCountdown();

  //   interval = setInterval(updateCountdown, 1000); // Remove const keyword
  // };
  // console.log(days, hours, minutes, seconds);
  // useEffect(() => {
  //   countDown();

  //   return () => clearInterval(interval);
  // }, []);

  // const calculateTimeLeft = () => {
  //   const difference = +new Date("Jan 25, 2024") - +new Date();
  //   let timeLeft = {};

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60),
  //     };
  //   } else {
  //     clearInterval(timerInterval.current);
  //     timeLeft = {
  //       days: 0,
  //       hours: 0,
  //       minutes: 0,
  //       seconds: 0,
  //     };
  //   }

  //   return timeLeft;
  // };

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // const timerInterval = useRef(null);

  // useEffect(() => {
  //   timerInterval.current = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timerInterval.current);
  // }, []);
  async function getTrandingProducts() {
    try {
      const {data} = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const {data} = useQuery("trendingProducts", getTrandingProducts);
  useEffect(() => {
    // Add any additional initialization code here
  }, []);
  return (
    <>
      <div className='container'>
        {" "}
        <section className='product-sale mb-6'>
          <div className='container'>
            <div className='row shadow position-relative'>
              {/* Img */}
              <div className='sale '>
                <p
                  // data-aos='fade-down'
                  // data-aos-duration='1000'
                  className='text-white'
                >
                  Up to 50% Off
                </p>
              </div>
              <div className=' shadow d-flex justify-content-evenly flex-wrap '>
                <div className='image  py-5'>
                  <img
                    src={require("../../Project Assests/images/1678304764905-cover.jpeg")}
                    alt='dell'
                  ></img>
                </div>
                <div className='info py-5'>
                  <div className='product-data '>
                    {data?.slice(34, 35).map((product) => (
                      <div key={product.id}>
                        <h2>
                          {product.title.split(" ").splice(0, 2).join(" ")}
                        </h2>
                        <div className='price'>
                          <p className='old-price'> EGY {product.price * 2} </p>
                          <p className='new-price'> EGY {product.price}</p>
                        </div>
                      </div>
                    ))}
                    <h4>Limited Time Offer</h4>
                  </div>

                  <div className='btns'>
                    <Link to={`/product-details/6408da1c6406cd15828e8f0a`}>
                      <button>Show Now</button>
                    </Link>
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

export default ProductSale;
