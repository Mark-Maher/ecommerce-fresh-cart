import React, {useState} from "react";
import styles from "./Register.module.css";
import {useFormik} from "formik";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Helmet} from "react-helmet";

function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(false);
  const [btnDisabled, setbtnDisabled] = useState(false);

  const navigate = useNavigate();
  async function callRegister(reqBody) {
    setErrorMsg("");
    setloading(true);
    setbtnDisabled(true);
    const {data} = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .catch((err) => {
        setloading(false);
        setbtnDisabled(false);
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
      });
    if ((data.message = "success")) {
      // alert("Success!");
      let timerInterval;
      Swal.fire({
        title: "Register Is Complete successfully",
        html: "You Will Navigate To Login Page in <b></b> milliseconds.",
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
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      navigate("/login");
    }
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("name is required"),
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "invalid Password (should have a minimum length of 3 characters include one uppercase letter and numbers)"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([
        Yup.ref("password"),
        "password and rePassword should be the same",
      ])
      .required("rePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}/, "invalid Phone")
      .required("phone is required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });
  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <div className={`${styles.FormWidth} mt-5`}>
        {errorMsg ? <div className='alert alert-danger'>{errorMsg}</div> : null}

        <form onSubmit={registerForm.handleSubmit} className='formDesign p-5'>
          <h2 className='text-main mb-3 animate__animated animate__fadeInLeft'>
            Register Now
          </h2>
          <div className='animate__animated animate__zoomInDown overflow-hidden p-3'>
            {" "}
            <div className='form-group mb-2'>
              <label htmlFor='fullName' className='mb-2 fw-bold'>
                Full Name :
              </label>
              <input
                type='text'
                className=' _input_xebgj_29'
                id='fullName'
                name='name'
                value={registerForm.values.name}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />
              {registerForm.errors.name && registerForm.touched.name ? (
                <div className='alert alert-danger'>
                  {registerForm.errors.name}
                </div>
              ) : null}
            </div>
            <div className='form-group mb-2'>
              <label htmlFor='email' className='mb-2 fw-bold'>
                Email :
              </label>
              <input
                type='text'
                className='_input_xebgj_29'
                id='email'
                name='email'
                value={registerForm.values.email}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />
              {registerForm.errors.email && registerForm.touched.email ? (
                <div className='alert alert-danger'>
                  {registerForm.errors.email}
                </div>
              ) : null}
            </div>
            <div className='form-group mb-2'>
              <label htmlFor='password' className='mb-2 fw-bold'>
                Password :
              </label>
              <input
                type='password'
                className='_input_xebgj_29'
                id='password'
                name='password'
                value={registerForm.values.password}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />{" "}
              {registerForm.errors.password && registerForm.touched.password ? (
                <div className='alert alert-danger'>
                  {registerForm.errors.password}
                </div>
              ) : null}
            </div>
            <div className='form-group mb-2 '>
              <label htmlFor='rePassword' className='mb-2 fw-bold'>
                rePassword :
              </label>
              <input
                type='password'
                className='_input_xebgj_29'
                id='rePassword'
                name='rePassword'
                value={registerForm.values.rePassword}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />{" "}
              {registerForm.errors.rePassword &&
              registerForm.touched.rePassword ? (
                <div className='alert alert-danger'>
                  {registerForm.errors.rePassword}
                </div>
              ) : null}
            </div>
            <div className='form-group mb-2'>
              <label htmlFor='phone' className='mb-2 fw-bold'>
                Phone :
              </label>
              <input
                type='tel'
                className='_input_xebgj_29'
                id='phone'
                name='phone'
                value={registerForm.values.phone}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />{" "}
              {registerForm.errors.phone && registerForm.touched.phone ? (
                <div className='alert alert-danger'>
                  {registerForm.errors.phone}
                </div>
              ) : null}
            </div>
          </div>
          <div className='text-end animate__animated animate__fadeInRight'>
            <button
              className='btn bg-main me-2 mt-3 text-white'
              type='reset'
              onClick={() => {
                registerForm.handleReset();
              }}
            >
              Reset
            </button>
            <button
              className='btn bg-main  mt-3 text-white'
              type={btnDisabled ? "disabled" : "submit"}
              disabled={!(registerForm.isValid && registerForm.dirty)}
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
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
