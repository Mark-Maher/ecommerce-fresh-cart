import React, {useContext, useState} from "react";
import styles from "./TrendingProducts.module.css";
import Aos from "aos";
import axios from "axios";
// import toast from "react-hot-toast";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";

import Loader from "../Loader/Loader";
import {cartContext} from "../../Context/CartContext";
import {toast} from "react-toastify";

function TrendingProducts() {
  let [loading, setLoading] = useState(false);
  let [heartColor, setHeartColor] = useState(false);
  let [displaybtn, setDisplayBtn] = useState(false);
  let [wishdata, setWishData] = useState(null);

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
    setDisplayBtn(true);
    let data = await addToCart(Id);
    if (data.status === "success") {
      toast.success(data.message, {theme: "colored", autoClose: 2000});
      setDisplayBtn(false);
    } else {
      toast.error("failed to add product", {theme: "colored", autoClose: 2000});
      setDisplayBtn(false);
    }
  }
  async function addProductToWishlist(Id) {
    setLoading(true);
    setDisplayBtn(true);
    let data = await addToWishlist(Id);
    if (data.status === "success") {
      getToWishlist();
      setLoading(false);
      toast.success(data.message, {theme: "colored", autoClose: 2000});
      setDisplayBtn(false);
    } else {
      toast.error("failed to add product", {theme: "colored", autoClose: 2000});
      setHeartColor(false);
      setDisplayBtn(false);
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
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  let {data, isLoading} = useQuery("trandingProducts", getTrandingProducts);
  async function deleteItem(productId) {
    setDisplayBtn(true);
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {token: localStorage.getItem("user")},
        }
      );
      getWishListDetails();
      toast.error("Product deleted successfully", {
        theme: "colored",
        autoClose: 2000,
      });
      setDisplayBtn(false);
      if (data.status === "success") {
        setWishData(data);
      }

      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setDisplayBtn(false);
      throw error;
    }
  }
  async function getWishListDetails() {
    setDisplayBtn(true);

    try {
      setLoading(true);
      let data = await getToWishlist();
      setWishData(data);
      setLoading(false);
      setDisplayBtn(false);
    } catch (error) {
      setWishData(null);
      setDisplayBtn(false);

      console.error("Error getting cart details:", error);
    }
  }
  return (
    <>
      {" "}
      <div className='Ttanding-products mt-5'>
        <div className='container'>
          <div className='row gy-3 '>
            <h2>
              Trending{" "}
              <span>
                Products{" "}
                <i className='fa-solid fa-arrow-trend-up fs-1 ms-1'></i>
              </span>
            </h2>
            {isLoading ? <Loader /> : ""}

            {data?.slice(35, 39).map((product, index) => (
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
                        <button
                          className='border-0 bg-white'
                          disabled={displaybtn ? true : false}
                        >
                          <i
                            className='fa-solid fa-heart text-danger fs-2 border-0'
                            onClick={() => deleteItem(product.id)}
                          ></i>
                        </button>
                      ) : (
                        <button
                          className='border-0 bg-white'
                          disabled={displaybtn ? true : false}
                        >
                          {" "}
                          <i
                            className='fa-solid fa-heart fs-2 border-0 text-black'
                            onClick={() => addProductToWishlist(product.id)}
                          ></i>
                        </button>
                      )}
                    </div>

                    <span className='d-block'>{product.category.name}</span>

                    <div className='trand-product-price'>
                      <p>EGY {product.price}</p>
                      <button
                        className='border-0 bg-white'
                        disabled={displaybtn ? true : false}
                      >
                        <i
                          onClick={() => addProductToCart(product.id)}
                          className='fa-solid fa-cart-arrow-down fa-flip-horizontal'
                        ></i>
                      </button>
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

export default TrendingProducts;
