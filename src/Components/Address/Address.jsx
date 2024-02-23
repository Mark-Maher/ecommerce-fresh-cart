import React, {useContext, useState} from "react";
import styles from "./Address.module.css";
import {TokenContext} from "../../Context/Token";
import Swal from "sweetalert2";
import {useFormik} from "formik";
import {Spinner} from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import {FaCcVisa} from "react-icons/fa";

import {Navigate, useNavigate, useParams} from "react-router-dom";
import {cartContext} from "../../Context/CartContext";
function Address() {
  let {cartId} = useParams();
  const [loading, setloading] = useState(false);
  let navigate = useNavigate();
  const {payForOrder, isOnlinePayment, setIsOnlinePayment, setNumOfCartItems} =
    useContext(cartContext);

  async function sendDataToAPi(values) {
    setloading(true);
    let data = await payForOrder(cartId, values);
    if (data?.status === "success" && isOnlinePayment) {
      window.location.href = data.session.url;
    } else if (data?.status === "success" && !isOnlinePayment) {
      navigate("/allorders");
      let timerInterval;
      Swal.fire({
        title: "Purchase Is Complete",
        html: "You Will Navigate To My orders Page in <b></b> milliseconds.",
        timer: 800,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      navigate("/allorders");
    }
    setloading(false);
  }
  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}/, "invalid Phone")
      .required("phone is required"),
    city: Yup.string()
      .min(3, "city name is too short")
      .required("city is required"),
  });
  const address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: sendDataToAPi,
  });
  return (
    <>
      <div className={`${styles.addressForm}`}>
        {" "}
        <form onSubmit={address.handleSubmit}>
          <div className='form-group mb-2'>
            <label htmlFor='phone' className='mb-2 fs-5 fw-bolder'>
              phone :
            </label>
            <input
              type='tel'
              className='form-control'
              id='phone'
              name='phone'
              value={address.values.password}
              onChange={address.handleChange}
              onBlur={address.handleBlur}
            />{" "}
            {address.errors.phone && address.touched.phone ? (
              <div className='alert alert-danger'>{address.errors.phone}</div>
            ) : null}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='city' className='mb-2 fs-5 fw-bolder'>
              city :
            </label>
            <input
              type='text'
              className='form-control'
              id='city'
              name='city'
              value={address.values.password}
              onChange={address.handleChange}
              onBlur={address.handleBlur}
            />{" "}
            {address.errors.city && address.touched.city ? (
              <div className='alert alert-danger'>{address.errors.city}</div>
            ) : null}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='details' className='mb-2 fs-5 fw-bolder'>
              details :
            </label>
            <textarea
              type='text'
              className='form-control'
              id='details'
              name='details'
              value={address.values.email}
              onChange={address.handleChange}
              onBlur={address.handleBlur}
            ></textarea>
          </div>
          <div className='my-4'>
            {" "}
            <input
              type='checkbox'
              className='form-check-input me-2'
              onChange={() => {
                setIsOnlinePayment(!isOnlinePayment);
              }}
            />{" "}
            <span className='fw-bolder'>You want to pay Online ?!</span>
          </div>
          {isOnlinePayment ? (
            <button
              className='btn bg-main d-block me-auto mt-3 text-white fw-bold'
              type='submit'
              disabled={!(address.isValid && address.dirty)}
            >
              {loading ? (
                <Spinner
                  animation='border'
                  role='status'
                  size='sm'
                  className='me-1 fw'
                >
                  <span className='visually-hidden '>Loading...</span>
                </Spinner>
              ) : (
                <div className='d-flex align-items-center'>
                  Online payment <i class='fa-brands fa-cc-visa fs-4 ms-2'></i>{" "}
                  <i class='fa-brands fa-cc-paypal ms-2 fs-4'></i>
                </div>
                // `Online payment ${(<i class='fa-brands fa-cc-visa'></i>)}`
              )}
            </button>
          ) : (
            <button
              className='btn bg-main d-block me-auto mt-3 text-white fw-bold'
              type='submit'
              disabled={!(address.isValid && address.dirty)}
            >
              {loading ? (
                <Spinner
                  animation='border'
                  role='status'
                  size='sm'
                  className='me-1 fw'
                >
                  <span className='visually-hidden '>Loading...</span>
                </Spinner>
              ) : (
                "Cash Payment"
              )}
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Address;
