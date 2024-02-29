import React, {useState} from "react";
import styles from "./UpdatePassword.module.css";
import {Link, Navigate} from "react-router-dom";
import {useFormik} from "formik";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import {TokenContext} from "../../Context/Token";
import axios from "axios";
import {useQuery} from "react-query";
import Loader from "../Loader/Loader";
function UpdatePassword() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(false);
  const [btnDisabled, setbtnDisabled] = useState(false);
  const [msg, setmsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [PassMsg, setPassMsg] = useState("");

  const [Data, setData] = useState(null);
  async function changePassword(reqBody) {
    console.log(reqBody);
    try {
      setloading(true);
      setbtnDisabled(true);
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        reqBody,
        {
          headers: {token: localStorage.getItem("user")},
        }
      );
      setData(response);
      localStorage.setItem("userPassword", reqBody?.password);
      console.log(response.data.user.email);
      console.log(response.data.user.password);
      setloading(false);
      setbtnDisabled(false);
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setloading(false);
      console.log(error.response.data.message);
      setErrMsg(error.response.data.message);
      setbtnDisabled(false);
      setPassMsg(null);
      setData(null);
    }
  }
  console.log(errMsg);

  console.log(Data);
  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "current password is required")
      .required("current password is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "invalid Password (should have a minimum length of 3 characters include one uppercase letter and numbers)"
      )
      .required("new password is required"),
    rePassword: Yup.string()
      .oneOf([
        Yup.ref("password"),
        "password and rePassword should be the same",
      ])
      .required("rePassword is required"),
  });
  const loginForm = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: changePassword,
  });
  return (
    <>
      {" "}
      <div className='container my-5 '>
        <form onSubmit={loginForm.handleSubmit} className='formDesign p-5 '>
          <h2 className='animate__animated animate__fadeInRight text-main mb-3 '>
            Update Your Data :
          </h2>
          {Data?.data?.message === "success" ? (
            <div className='alert alert-success'>success</div>
          ) : Data?.data?.message === "fail" ? (
            <div className='alert text-danger fw-bold'>{errMsg}</div>
          ) : Data === null || "" || undefined ? (
            <div className='alert text-danger fw-bold'>{errMsg}</div>
          ) : null}

          <div className='animate__animated animate__zoomInDown'>
            {" "}
            <div className='form-group mb-2'>
              <input
                type='password'
                className='_input_xebgj_29'
                id='currentPassword'
                name='currentPassword'
                value={loginForm.values.currentPassword}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                placeholder='current Password'
              />{" "}
              {loginForm.errors.currentPassword &&
              loginForm.touched.currentPassword ? (
                <div className='alert alert-danger mt-1 rounded-8 fw-bold'>
                  {loginForm.errors.currentPassword}
                </div>
              ) : null}
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='_input_xebgj_29'
                id='password'
                name='password'
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                placeholder='New Password'
              />{" "}
              {loginForm.errors.password && loginForm.touched.password ? (
                <div className='alert alert-danger mt-1 rounded-8 fw-bold'>
                  {loginForm.errors.password}
                </div>
              ) : null}
            </div>
            <div className='form-group mb-2 '>
              <input
                type='password'
                className='_input_xebgj_29'
                id='rePassword'
                name='rePassword'
                value={loginForm.values.rePassword}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                placeholder='Re-Password'
              />{" "}
              {loginForm.errors.rePassword && loginForm.touched.rePassword ? (
                <div className='alert alert-danger mt-1 rounded-8 fw-bold'>
                  {loginForm.errors.rePassword}
                </div>
              ) : null}
            </div>
          </div>

          <button
            className='btn bg-main  mt-3 text-white animate__animated animate__fadeInLeft'
            type={btnDisabled ? "disabled" : "submit"}
            disabled={!(loginForm.isValid && loginForm.dirty)}
            onClick={() => {
              changePassword();
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

export default UpdatePassword;
