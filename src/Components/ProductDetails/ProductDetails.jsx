import React, {useContext} from "react";
import styles from "./ProductDetails.module.css";
import {useQuery} from "react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import {useParams} from "react-router-dom";
import Slider from "react-slick";
import {cartContext} from "../../Context/CartContext";
import {toast} from "react-toastify";
function ProductDetails() {
  const {addToCart} = useContext(cartContext);
  const {productID} = useParams();
  console.log(productID);
  async function addProductToCart(Id) {
    let data = await addToCart(Id);
    console.log("data", data);

    if (data.status === "success") {
      toast.success(data.message, {theme: "colored"});
    } else {
      toast.error("failed to add product", {theme: "colored"});
    }
  }

  function getProductDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productID}`
    );
  }
  let {data, isLoading, isError, error, isFetching} = useQuery(
    "ProductDetails",
    getProductDetails
  );
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <section className='py-5'>
        {" "}
        {isLoading && <Loader />}
        <div className='container'>
          {isError && <div className='alert alert-danger'>{error.message}</div>}
          {data?.data.data && (
            <div className='row align-items-center g-5'>
              <div className='col-md-4'>
                <div className={`${styles.MainSlider}`}>
                  {" "}
                  <Slider {...settings}>
                    {isFetching && <Loader />}
                    {data.data.data.images.map((image, index) => (
                      <img src={image} alt='' className='w-100' key={index} />
                    ))}
                  </Slider>
                </div>
              </div>
              <div className='col-md-8'>
                <h3>{data.data.data.title}</h3>
                <p>{data.data.data.description}</p>
                <div>
                  <h3>{data.data.data.category.name}</h3>{" "}
                  <h4 className='h6'>
                    Brand Name : {data.data.data.brand.name}
                  </h4>
                  <h4 className='h6'>Quantity : {data.data.data.quantity}</h4>
                  <div className='d-flex justify-content-between my-2'>
                    {" "}
                    <h4 className='h6'>Price : {data.data.data.price}</h4>
                    <h4 className='h6'>
                      Rating
                      <i className='fas fa-star rating-bg rating-color ms-2'></i>{" "}
                      {data.data.data.ratingsAverage}
                    </h4>
                  </div>
                  <button
                    className='btn btn-success w-100 '
                    onClick={() => {
                      addProductToCart(productID);
                    }}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
