import React, {useContext, useEffect, useState} from "react";
import styles from "./MyOrders.module.css";
import {TokenContext} from "../../Context/Token";
import axios from "axios";
import {date} from "yup";
import {jwtDecode} from "jwt-decode";
import Loader from "../Loader/Loader";
function MyOrders() {
  let [orderData, setOrederData] = useState([]);
  let [loading, setLoading] = useState(false);
  let token = localStorage.getItem("user");
  let {id} = jwtDecode(token);
  async function getMyOrders() {
    setLoading(true);
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    setOrederData(data);
    setLoading(false);
  }

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container my-5 bg-main-light p-5 rounded-3'>
          <h2 className='text-center fs-1 fw-bold mb-5'>My Orders</h2>
          {orderData?.map((order, index) => (
            <div key={index}>
              <div className='row align-items-start border-bottom g-2'>
                <h3 className='fw-bold mt-3'>
                  Order Number : <span className='text-main'>{index + 1}</span>
                </h3>
                <div className='col-md-8'>
                  {order.cartItems.map((item, index) => {
                    return (
                      <div className='d-flex align-items-center ' key={index}>
                        <img
                          src={item.product.imageCover}
                          alt=''
                          className='w-25 me-3 my-3 rounded'
                        />
                        <div className='fw-bold'>
                          {" "}
                          <p className='text-main fw-bold'>
                            {item.product.category.name}
                          </p>{" "}
                          <p>{item.product.title}</p>
                          <p> Count : {item.count}</p>
                          <p> Price : {item.price}</p>{" "}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='col-md-4 border-black mt-5 fw-bold border border-success p-2 rounded'>
                  <p className=''>
                    Order <span className='text-main fs-5'>{index + 1}</span>{" "}
                    Details{" "}
                  </p>
                  <p>Payment Method : {order.paymentMethodType} </p>
                  <p>Total Order Price : {order.totalOrderPrice}</p>
                </div>
              </div>
            </div> // Added key prop for each order
          ))}
        </div>
      )}
    </>
  );
}

export default MyOrders;
