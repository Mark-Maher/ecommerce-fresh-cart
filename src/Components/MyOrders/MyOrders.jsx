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
    window.scrollTo(0, 0);
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
        <div className='container my-5 formDesign p-5 rounded-3 '>
          <h2 className='fs-1 fw-bold my-2 text-main pb-5 text-center animate__animated animate__fadeInDown'>
            My Orders
          </h2>
          {orderData?.map((order, index) => (
            <div key={index}>
              <div className='row align-items-start border-bottom  gy-2'>
                <h3 className='fw-bold mt-5'>
                  Order Number : <span className='text-main'>{index + 1}</span>
                </h3>
                {/* <div className='col-md-3'> */}
                <div className='mt-5 fw-bold border  p-3 rounded-9 _input_xebgj_29  mb-4 animate__animated animate__fadeInDown'>
                  <p className='text-start fw-bold fs-4'>
                    Order <span className='text-main fs-4'>{index + 1}</span>{" "}
                    Details{" "}
                  </p>
                  <div
                    className={`d-flex justify-content-start w-100 ${styles.flexColum}`}
                  >
                    {" "}
                    <div className='me-5'>
                      {" "}
                      <p>Payment Method : {order.paymentMethodType} </p>
                      <p>Email : {order.user.email} </p>
                      <p>Total Order Price : {order.totalOrderPrice}</p>
                    </div>
                    <div className=''>
                      <p>Name :{order.user.name} </p>
                      <p>City :{order.shippingAddress.details} </p>
                      <p>Phone :{order.shippingAddress.phone} </p>
                    </div>
                  </div>
                </div>
                {order.cartItems.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <div className='col-md-3  mb-3 _input_xebgj_29 animate__animated animate__fadeInUpBig'>
                        {" "}
                        <div
                          className={`d-flex align-items-center ${styles.flexColum}`}
                          key={index}
                        >
                          <img
                            src={item.product.imageCover}
                            alt=''
                            className='w-25 me-3 my-3 rounded'
                          />
                          <div className='fw-bold'>
                            {" "}
                            <p className='text-main fw-bold text-truncate'>
                              {item.product.category.name}
                            </p>{" "}
                            <p
                              className='my-1 text-truncate'
                              style={{maxWidth: "140px"}}
                            >
                              {item.product.title}
                            </p>
                            <p className='my-1'> Count : {item.count}</p>
                            <p className='my-1'> Price : {item.price}</p>{" "}
                          </div>
                        </div>
                      </div>{" "}
                    </>
                  );
                })}

                {/* </div> */}
              </div>
            </div> // Added key prop for each order
          ))}
        </div>
      )}
    </>
  );
}

export default MyOrders;
