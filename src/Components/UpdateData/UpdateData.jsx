import React, {useContext, useEffect, useState} from "react";
import styles from "./UpdateData.module.css";
import {Link, Navigate} from "react-router-dom";
import {useFormik} from "formik";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import {TokenContext} from "../../Context/Token";
import axios from "axios";
import {useQuery} from "react-query";
import Loader from "../Loader/Loader";
function UpdateData() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(false);
  const [btnDisabled, setbtnDisabled] = useState(false);
  const [msg, setmsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [Data, setData] = useState(null);
  // function dataCheck(reqBody) {
  //   return axios.put(
  //     `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
  //     reqBody,
  //     {
  //       headers: {token: localStorage.getItem("user")},
  //     }
  //   );
  // }
  async function dataCheck(reqBody) {
    try {
      setloading(true);
      setbtnDisabled(true);
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        reqBody,
        {
          headers: {token: localStorage.getItem("user")},
        }
      );
      setData(response);
      localStorage.setItem(
        "userEmail",
        JSON.stringify(response.data.user.email)
      );
      console.log(response.data.user.email);
      setloading(false);
      setbtnDisabled(false);
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setloading(false);
      setErrMsg(error.response.data.message);
      setbtnDisabled(false);
    }
  }
  // let {data, isError, isLoading, error, isFetching} = useQuery(
  //   "FeatureProducts",
  //   dataCheck
  // );
  // console.log(data?.data.message, isLoading);
  console.log(Data);
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("name is required"),
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}/, "invalid Phone")
      .required("phone is required"),
  });
  const loginForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: dataCheck,
  });
  // useEffect(() => {
  //   dataCheck();
  // }, []);
  return (
    <>
      {" "}
      {/* {isLoading && <Loader />} */}
      <div className='container my-5 '>
        <form onSubmit={loginForm.handleSubmit} className='formDesign p-5 '>
          <h2 className='animate__animated animate__fadeInDown text-main mb-3 '>
            Update Your Data :
          </h2>
          {Data?.data?.message === "success" ? (
            <div className='alert alert-success'>success</div>
          ) : Data?.data?.message === "fail" ? (
            <div className='alert alert-danger'>{errMsg}</div>
          ) : null}

          <div className='animate__animated animate__zoomInDown'>
            {" "}
            <div className='form-group mb-3'>
              <input
                type='text'
                className=' _input_xebgj_29'
                id='name'
                name='name'
                value={loginForm.values.name}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                placeholder='Name...'
              />{" "}
              {loginForm.errors.name && loginForm.touched.name ? (
                <div className='alert alert-danger mt-1 rounded-8 fw-bold'>
                  {loginForm.errors.name}
                </div>
              ) : null}
              <input
                type='text'
                className=' _input_xebgj_29'
                id='email'
                name='email'
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                placeholder='Email...'
              />{" "}
              {loginForm.errors.email && loginForm.touched.email ? (
                <div className='alert alert-danger mt-1 rounded-8 fw-bold'>
                  {loginForm.errors.email}
                </div>
              ) : null}
              <input
                type='text'
                className=' _input_xebgj_29'
                id='phone'
                name='phone'
                value={loginForm.values.phone}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                placeholder='Phone...'
              />{" "}
              {loginForm.errors.phone && loginForm.touched.phone ? (
                <div className='alert alert-danger mt-1 rounded-8 fw-bold'>
                  {loginForm.errors.phone}
                </div>
              ) : null}
            </div>
          </div>

          <button
            className='btn bg-main  mt-3 text-white animate__animated animate__fadeInLeft'
            type={btnDisabled ? "disabled" : "submit"}
            disabled={!(loginForm.isValid && loginForm.dirty)}
            onClick={() => {
              dataCheck();
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
              "update"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateData;
