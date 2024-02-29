import React, {useContext, useEffect, useState} from "react";
import styles from "./WishList.module.css";
import {cartContext} from "../../Context/CartContext";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import {toast} from "react-toastify";
import axios from "axios";
function WishList() {
  const {addToWishlist, getToWishlist, addToCart} = useContext(cartContext);
  const userToken = localStorage.getItem("user");

  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  async function getWishListDetails() {
    try {
      setLoading(true);
      let data = await getToWishlist();
      setData(data);
      setLoading(false);
    } catch (error) {
      setData(null);

      console.error("Error getting cart details:", error);
    }
  }
  async function addProductToCart(Id) {
    let data = await addToCart(Id);
    if (data.status === "success") {
      toast.success(data.message, {theme: "colored"});
    } else {
      toast.error("failed to add product", {theme: "colored"});
    }
  }
  async function deleteItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {token: userToken},
        }
      );
      if (data.status === "success") {
        toast.error("Product deleted successfully", {theme: "colored"});
        setData(data);
      }

      getWishListDetails();
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  }
  useEffect(() => {
    getWishListDetails();
    // deleteItem();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : data?.data.length === 0 ? (
        <div className='text-center my-4 py-4'>
          <img
            src={require("../../Project Assests/images/download.jpg")}
            alt=''
            className={`${styles.wishempty}`}
          />{" "}
          <h2 className='text-center my-3 text-main py-3'>
            There is not products in your wish list , you can continue shopping
            from .
          </h2>
          <Link
            to={"/products"}
            className='btn btn-success py-3 text-white fw-bolder'
          >
            Go to our products
          </Link>
        </div>
      ) : (
        <div className='container'>
          {" "}
          <div className='container my-5 formDesign p-4 rounded-3 animate__animated animate__fadeInRightBig'>
            <h2 className='fs-1 fw-bold my-2 text-main pb-3'>My Wish List:</h2>

            {data?.data.map((item, index) => {
              return (
                <div
                  className='row py-4 g-4 border-bottom align-items-center'
                  key={index}
                >
                  <div className='col-md-2'>
                    <img src={item.imageCover} className='w-100' alt='' />
                  </div>
                  <div className='col-md-10 d-flex  justify-content-between'>
                    {" "}
                    <div>
                      <p className='my-2'>{item.title}</p>
                      <p className='text-main fw-bolder my-2'>
                        Price : {item.price} EGP
                      </p>
                      <div className='d-flex  w-100 my-2'>
                        {" "}
                        <button
                          className='btn btn-danger'
                          onClick={() => {
                            deleteItem(item.id);
                          }}
                        >
                          Remove <i className='fa-solid fa-trash ms-2'></i>
                        </button>
                        <button
                          className='btn btnn bg-main text-white font-sm ms-3'
                          onClick={() => {
                            addProductToCart(item.id);
                          }}
                        >
                          add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default WishList;
