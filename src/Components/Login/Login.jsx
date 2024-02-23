import React, {useContext, useEffect, useState} from "react";
import styles from "./Login.module.css";
import {useFormik} from "formik";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {TokenContext} from "../../Context/Token";
import {Helmet} from "react-helmet";
function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(false);
  const [btnDisabled, setbtnDisabled] = useState(false);

  const {setToken} = useContext(TokenContext);
  const navigate = useNavigate();
  async function callLogin(reqBody) {
    setErrorMsg("");
    setloading(true);
    setbtnDisabled(true);
    const {data} = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
      .catch((err) => {
        setloading(false);
        setbtnDisabled(false);
        setErrorMsg(err.response.data.message);
      });
    if ((data.message = "success")) {
      // alert("Success!");
      localStorage.setItem("user", data.token);
      setToken(data.token);
      let timerInterval;
      Swal.fire({
        title: "Register Is Complete",
        html: "You Will Navigate To Home Page in <b></b> milliseconds.",
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
      navigate("/home");
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid Password")
      .required("password is required"),
  });
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });
  // useEffect(() => {
  //   callLogin();
  // }, []);
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className={`${styles.loginFormWidth} `}>
        {errorMsg ? <div className='alert alert-danger'>{errorMsg}</div> : null}
        <h2>Login Now</h2>
        <form onSubmit={loginForm.handleSubmit}>
          <div className='form-group mb-2'>
            <label htmlFor='email' className='mb-2'>
              Email :
            </label>
            <input
              type='text'
              className='form-control'
              id='email'
              name='email'
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className='alert alert-danger'>{loginForm.errors.email}</div>
            ) : null}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='password' className='mb-2'>
              Password :
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />{" "}
            {loginForm.errors.password && loginForm.touched.password ? (
              <div className='alert alert-danger'>
                {loginForm.errors.password}
              </div>
            ) : null}
          </div>

          <button
            className='btn bg-main d-block me-auto mt-4 text-white'
            type='submit'
            disabled={!(loginForm.isValid && loginForm.dirty)}
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
              "Login"
            )}
          </button>
          <p className='mt-3'>
            <Link
              className='text-start my-3 cursor-pointer pass text-decoration-none text-dark '
              to={"/forgetpassword"}
            >
              Forget Your Password ?
            </Link>
          </p>
          <p className='text-start my-3'>
            Don't have an account?{" "}
            <Link to={"/register"} className='text-main fw-bold'>
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
