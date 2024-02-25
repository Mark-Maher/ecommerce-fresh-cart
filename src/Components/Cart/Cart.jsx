import React, {useContext, useEffect, useState} from "react";
import styles from "./Cart.module.css";
import {Helmet} from "react-helmet";
import {cartContext} from "../../Context/CartContext";
import {counter} from "@fortawesome/fontawesome-svg-core";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import Loader from "./../Loader/Loader";
import {Link} from "react-router-dom";
import axios from "axios";
import {Spinner} from "react-bootstrap";
function Cart() {
  const {
    getCart,
    setNumOfCartItems,
    numOfCartItems,
    deleteItem,
    updateQuantity,
    userToken,
  } = useContext(cartContext);
  let [data, setData] = useState(null);
  let [productQty, setProductQty] = useState(0);
  let [loading, setLoading] = useState(false);

  let [clearloading, setClearLoading] = useState(false);
  let [deleteLoading, setDeleteLoading] = useState(false);

  async function clearallcart() {
    setClearLoading(true);
    try {
      let data = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {headers: {token: localStorage.getItem("user")}}
      );
      console.log(data);
      toast.success(data.data.message, {theme: "colored"});
      setClearLoading(false);
      getCartDetails();
    } catch (e) {
      console.log(e);
      toast.error("failed", {theme: "colored"});
    }
  }
  async function getCartDetails() {
    try {
      let data = await getCart();
      setData(data);
    } catch (error) {
      setNumOfCartItems(0);
      setData(null);

      console.error("Error getting cart details:", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      let data = await getCart();
      if (data?.response?.data.statusMsg === "fail") {
        setNumOfCartItems(0);
        setData(null);
      } else {
        setData(data);
        setNumOfCartItems(data?.numOfCartItems);
      }
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    getCartDetails();
    setData();
  }, []);
  async function deleteProduct(id) {
    setDeleteLoading(true);
    let data = await deleteItem(id);
    console.log(data);
    if (data.status === "success") {
      toast.error("Product deleted successfully", {theme: "colored"});
      setNumOfCartItems(data.numOfCartItems);
      setData(data);
      setDeleteLoading(false);
    }
  }
  async function updateProduct(id, count) {
    let data = await updateQuantity(id, count);
    console.log(data);
    if (data.status === "success") {
      toast.success("Product updated successfully", {theme: "colored"});
      setNumOfCartItems(data.numOfCartItems);
      setData(data);
    }
  }
  function checkProductQuantity(itemQuantity, productID) {
    if (itemQuantity === 0) {
      console.log(itemQuantity);
      deleteProduct(productID);
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : data?.numOfCartItems === undefined ? (
        <div className='text-center my-5 py-5'>
          {" "}
          <h2 className='text-center my-5 text-main py-4'>
            There is not products in your cart , you can continue shopping from
            .
          </h2>
          <Link
            to={"/products"}
            className='btn btn-success py-3 text-white fw-bolder'
          >
            Go to our products
          </Link>
        </div>
      ) : (
        <div className='container my-5 bg-main-light p-3 rounded-3'>
          <div className='d-flex justify-content-between align-items-center'>
            {" "}
            <div>
              <h2 className='fs-1 fw-bold my-2 text-main pb-3'>Shop Cart:</h2>
              <p className='text-main fw-bold'>
                Total Cart Price :{" "}
                {data?.data.totalCartPrice ? data.data.totalCartPrice : 0}
              </p>
            </div>
            <div>
              <button
                className='btn btn-danger'
                onClick={() => {
                  clearallcart();
                }}
              >
                {clearloading ? (
                  <Spinner
                    animation='border'
                    role='status'
                    size='sm'
                    className='me-1'
                  >
                    <span className='visually-hidden '>Loading...</span>
                  </Spinner>
                ) : (
                  "Clear All Cart"
                )}
              </button>
            </div>
          </div>
          {data?.data.products.map((item, index) => {
            return (
              <div className='row py-4 border-bottom' key={index}>
                <div className='col-md-1'>
                  <img src={item.product.imageCover} className='w-100' alt='' />
                </div>
                <div className='col-md-11 d-flex align-items-end justify-content-between'>
                  {" "}
                  <div>
                    <p className='m-0'>{item.product.title}</p>
                    <p className='text-main fw-bolder'>
                      Price : {item.price} EGP
                    </p>
                    <button
                      className='btn btn-danger'
                      onClick={(e) => {
                        deleteProduct(item.product._id);
                      }}
                    >
                      <i className='fa-regular fa-trash-can me-2'></i>
                      Remove
                    </button>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <button
                      className='btn bg-success text-white '
                      onClick={() => {
                        updateProduct(item.product._id, item.count + 1);
                      }}
                    >
                      +
                    </button>
                    <span className='px-3 fs-5 fw-bolder '>{item.count}</span>{" "}
                    <button
                      className='btn'
                      onClick={() => {
                        if (item.count >= 1) {
                          updateProduct(item.product._id, item.count - 1);
                        } else {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteProduct(item.product._id);
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              });
                            }
                          });
                        }
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            to={`/address/${data?.data._id}`}
            className='btn bg-main w-100 my-2 text-white py-3'
          >
            Place Order
          </Link>
        </div>
      )}
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
    </>
  );
}

export default Cart;
