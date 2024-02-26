import React, {useContext, useState} from "react";
import styles from "./BestSales.module.css";
// import Aos from "aos";
import axios from "axios";
// import toast from "react-hot-toast";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";

import Loader from "../Loader/Loader";
import {cartContext} from "../../Context/CartContext";
import {toast} from "react-toastify";

function BestSales() {
  let [loading, setLoading] = useState(false);
  let [heartColor, setHeartColor] = useState(false);
  const {addToCart, addToWishlist, wishlist, getToWishlist} =
    useContext(cartContext);
  // async function addProductToWishlist(Id) {
  //   setLoading(true);

  //   let data = await addToWishlist(Id);
  //   if (data.status === "success") {
  //     getToWishlist();
  //     setLoading(false);
  //     toast.success(data.message, {theme: "colored"});
  //   } else {
  //     toast.error("failed to add product", {theme: "colored"});
  //     setHeartColor(false);
  //   }
  // }
  async function addProductToCart(Id) {
    let data = await addToCart(Id);
    if (data.status === "success") {
      toast.success(data.message, {theme: "colored"});
    } else {
      toast.error("failed to add product", {theme: "colored"});
    }
  }
  async function addProductToWishlist(Id) {
    setLoading(true);

    let data = await addToWishlist(Id);
    if (data.status === "success") {
      getToWishlist();
      setLoading(false);
      toast.success(data.message, {theme: "colored"});
    } else {
      toast.error("failed to add product", {theme: "colored"});
      setHeartColor(false);
    }
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  // let {data, isError, isLoading, error, isFetching, refetch} = useQuery(
  //   "FeatureProducts",
  //   getProducts
  // );
  async function getTrandingProducts() {
    try {
      let {data} = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  let {data, isLoading} = useQuery("trandingProducts", getTrandingProducts);
  return (
    <>
      {" "}
      <div className='Ttanding-products my-4'>
        <div className='container'>
          <div className='row gy-3 '>
            <h2>
              Best{" "}
              <span>
                Rating <i class='fa-solid fa-arrow-up-wide-short fs-1 ms-1'></i>
              </span>
              {/* <span> (highest rate)</span> */}
            </h2>
            {isLoading ? <Loader /> : ""}
            {data
              ?.filter((product, index) => product.ratingsAverage >= 4.8)
              .slice(3)
              .reverse()
              .map((product, index) => (
                <div
                  key={product.id}
                  // data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                  // data-aos-duration='1000'
                  // data-aos-delay={`${index * 100}`}
                  className='col-md-6 col-lg-3'
                >
                  <div className='trand-item '>
                    <div className='trand-img  overflow-hidden  text-center  '>
                      <Link to={`/product-details/${product.id}`}>
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          loading={product.title}
                        />
                      </Link>
                    </div>

                    <div className='trand-product-info'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='h6 d-inline-block text-main fw-bolder'>
                          {product.title.split(" ").slice(0, 2)}
                        </h3>
                        <i className='fa fa-star text-warning'>
                          {" "}
                          <span> {product.ratingsAverage}</span>
                        </i>
                        {wishlist.some(
                          (hearted) => hearted?.id === product.id
                        ) ? (
                          <i
                            className='fa-solid fa-heart text-danger fs-2 border-0'
                            onClick={() => addProductToWishlist(product.id)}
                          ></i>
                        ) : (
                          <i
                            className='fa-solid fa-heart fs-2 border-0'
                            onClick={() => addProductToWishlist(product.id)}
                          ></i>
                        )}
                      </div>

                      <span className='d-block'>{product.category.name}</span>

                      <div className='trand-product-price'>
                        <p>EGY {product.price}</p>
                        <i
                          onClick={() => addProductToCart(product.id)}
                          className='fa-solid fa-cart-arrow-down fa-flip-horizontal'
                        ></i>
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

export default BestSales;
