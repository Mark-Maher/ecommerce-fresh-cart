import React, {useContext, useEffect, useState} from "react";
import styles from "./featureProducts.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import {cartContext} from "../../Context/CartContext";
import {toast} from "react-toastify";
import {Nav} from "react-bootstrap/Nav";

function FeatureProducts() {
  let [searchData, setSearchData] = useState("");
  let [loading, setLoading] = useState(false);

  let [heartColor, setHeartColor] = useState(false);
  const {addToCart, addToWishlist, wishlist, getToWishlist} =
    useContext(cartContext);
  async function addProductToCart(Id) {
    let data = await addToCart(Id);
    if (data.status === "success") {
      toast.success(data.message, {theme: "colored"});
    } else {
      toast.error("failed to add product", {theme: "colored"});
    }
  }

  async function addProductToWishlist(Id) {
    let data = await addToWishlist(Id);
    if (data.status === "success") {
      getToWishlist();
      toast.success(data.message, {theme: "colored"});
      console.log(data.data);

      // refetch();
    } else {
      toast.error("failed to add product", {theme: "colored"});
      setHeartColor(false);
    }
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let {data, isError, isLoading, error, isFetching} = useQuery(
    "FeatureProducts",
    getProducts
  );

  return (
    <>
      <section className='py-5'>
        {isLoading && <Loader />}

        {isError && <div className='alert alert-danger'>{error}</div>}

        {data?.data.data && (
          <div className='container'>
            <h2 className='fs-1 fw-bold my-2 text-main pb-3'>Products</h2>
            <input
              type='search'
              className='my-5 w-100 py-2 mx-auto form-control'
              placeholder='Search...'
              onChange={(e) => {
                setSearchData(e.currentTarget.value);
              }}
            />
            <div className='row'>
              {data?.data.data
                .filter((product) => {
                  return searchData.toLowerCase() === ""
                    ? product
                    : product.title
                        .toLowerCase()
                        .includes(searchData.toLowerCase());
                })
                .map((product) => {
                  return (
                    <div className='col-md-3' key={product.id}>
                      <div className='p-3  product'>
                        {" "}
                        <Link
                          to={`/product-details/${product.id}`}
                          className='text-dark'
                        >
                          {" "}
                          <img
                            src={product.imageCover}
                            alt={product.title}
                            className='w-100'
                          />
                          <h3 className='h6 fw-bolder text-main my-2'>
                            {product.category.name}
                          </h3>
                          <h3 className='h6 fw-bolder  text-truncate my-2'>
                            {product.title}
                          </h3>
                          <div className='d-flex justify-content-between my-2'>
                            {" "}
                            <h4 className='h6'>{product.price} EGP</h4>
                            <h4 className='h6'>
                              Rating
                              <i className='fas fa-star rating-bg rating-color ms-2'></i>{" "}
                              {product.ratingsAverage}
                            </h4>
                          </div>
                        </Link>
                        <div className='d-flex justify-content-between mt-3'>
                          {" "}
                          <button
                            className='btn btnn bg-main text-white font-sm px-3'
                            onClick={() => {
                              addProductToCart(product.id);
                            }}
                          >
                            add to cart
                          </button>
                          <button
                            className='btn'
                            onClick={() => {
                              addProductToWishlist(product.id);
                            }}
                          >
                            {wishlist.some(
                              (hearted) => hearted?.id === product.id
                            ) ? (
                              <i className='fa-solid fa-heart text-danger fs-2'></i>
                            ) : (
                              <i className='fa-solid fa-heart fs-2'></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default FeatureProducts;
