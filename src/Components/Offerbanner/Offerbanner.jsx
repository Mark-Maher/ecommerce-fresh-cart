import React, {useEffect} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import styles from "./Offerbanner.module.css";
function Offerbanner() {
  async function getOfferProducts() {
    try {
      let {data} = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      return data.data;
    } catch (error) {}
  }
  let {data} = useQuery("trandingProducts", getOfferProducts);

  useEffect(() => {
    // Aos.init({
    //   offset: 100,
    //   easing: "ease-in-sine",
    //   delay: 0,
    // });
  }, []);

  return (
    <>
      {" "}
      <div className='offer'>
        <div className='container'>
          <div className='row g-3 '>
            {data?.slice(38, 40).map((product) => (
              <div
                key={product.id}
                // data-aos='zoom-in-down'
                // data-aos-duration='1000'
                className='col-md-6 '
              >
                <div className='item'>
                  <div className='row g-3'>
                    <div className='col-6  animate__animated animate__fadeInDown'>
                      <div className='text'>
                        <p>Upto 40% off </p>
                        <h3>
                          {product.title.split(" ").splice(0, 2).join(" ")}
                        </h3>
                        <Link to={`/product-details/${product.id}`}>
                          <button className='btn '> Shop Now</button>
                        </Link>
                      </div>
                    </div>
                    <div className='col-6  animate__animated animate__fadeInUp'>
                      <div className='image'>
                        <img
                          src={product.imageCover}
                          className='img-fluid w-75'
                          alt={product.title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Offerbanner;
