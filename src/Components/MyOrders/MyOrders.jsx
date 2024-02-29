import React, {useContext, useEffect, useState} from "react";
import styles from "./MyOrders.module.css";
import {TokenContext} from "../../Context/Token";
import axios from "axios";
import {date} from "yup";
import {jwtDecode} from "jwt-decode";
import Loader from "../Loader/Loader";
import {Link} from "react-router-dom";
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
    console.log(data);
    console.log(data.length);
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
      ) : orderData?.length === 0 ? (
        <div className='text-center my-5 py-5'>
          {" "}
          <h2 className='text-center my-5 text-main py-4'>
            There is not products in your orders list , you can continue
            shopping from .
          </h2>
          <Link
            to={"/products"}
            className='btn btn-success py-3 text-white fw-bolder'
          >
            Go to our products
          </Link>
        </div>
      ) : (
        <div className='container my-5 formDesign p-5 rounded-3 animate__animated animate__fadeInRightBig'>
          <h2 className='fs-1 fw-bold my-2 text-main pb-5 text-center'>
            My Orders
          </h2>
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
