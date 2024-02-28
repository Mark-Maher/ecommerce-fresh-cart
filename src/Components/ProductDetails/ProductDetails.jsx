import React, {useContext, useState} from "react";
import styles from "./ProductDetails.module.css";
import {useQuery} from "react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import {useNavigate, useParams} from "react-router-dom";
import Slider from "react-slick";
import {cartContext} from "../../Context/CartContext";
import {toast} from "react-toastify";
import {Spinner} from "react-bootstrap";
function ProductDetails() {
  let [displaybtn, setDisplayBtn] = useState(false);
  const [loading, setloading] = useState(false);

  const {addToCart} = useContext(cartContext);
  const {productID} = useParams();
  let navigate = useNavigate();
  console.log(productID);
  async function addProductToCart(Id) {
    setloading(true);
    setDisplayBtn(true);
    let data = await addToCart(Id);
    console.log("data", data);

    if (data.status === "success") {
      toast.success(data.message, {theme: "colored"});
      setDisplayBtn(false);
      setloading(false);
    } else {
      toast.error("failed to add product", {theme: "colored"});
      setDisplayBtn(false);
      setloading(false);
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
          <div className='text-end mb-1'>
            <i
              className='fa-solid fa-circle-xmark fs-2 cursor-pointer closebtn'
              onClick={() => {
                navigate("/products");
              }}
            ></i>
          </div>
          {data?.data.data && (
            <div className='row align-items-center g-5'>
              <div className='col-md-4'>
                <div className={`${styles.MainSlider}`}>
                  {" "}
                  {data.data.data.images.length === 1 ? (
                    <img
                      src={data.data.data.images[0]}
                      alt=''
                      className='w-100'
                    />
                  ) : (
                    <Slider {...settings}>
                      {isFetching && <Loader />}
                      {data.data.data.images.map((image, index) => (
                        <img src={image} alt='' className='w-100' key={index} />
                      ))}
                    </Slider>
                  )}
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
                    className='btn addtocartbtn w-100 text-white'
                    disabled={displaybtn ? true : false}
                    onClick={() => {
                      addProductToCart(productID);
                    }}
                  >
                    {loading ? (
                      <Spinner
                        animation='border'
                        role='status'
                        size='sm'
                        className='me-1'
                      >
                        <span className='visually-hidden '>Loading...</span>
                      </Spinner>
                    ) : (
                      " add to cart"
                    )}
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
