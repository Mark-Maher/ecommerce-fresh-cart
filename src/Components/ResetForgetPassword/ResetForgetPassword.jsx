import React, {useState} from "react";
import styles from "./ResetForgetPassword.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Spinner} from "react-bootstrap";
function ResetForgetPassword() {
  let [email, setEmail] = useState("");
  let [newPassword, setNewPasswrod] = useState("");
  const [loading, setloading] = useState(false);
  let [sucsssmsg, setSucssMsg] = useState("");
  let navigate = useNavigate();
  async function resetforgotPassword() {
    try {
      setloading(true);
      let data = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          email,
          newPassword,
        }
      );
      setSucssMsg(data.data.message);
      setloading(false);
      let timerInterval;
      Swal.fire({
        title: "Reset your Password Is Complete",
        html: "You Will Navigate To Login Page in <b></b> milliseconds.",
        timer: 1000,
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
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {" "}
      <div className='container py-5 mt-5 px-4'>
        <div className='row'>
          <h2 className='fs-1 fw-bold my-2 text-main pb-3'>
            reset your account password
          </h2>
          <input
            type='email'
            placeholder='please enter your email...'
            className='form-control my-3 py-3'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type='password'
            placeholder='please enter your new password...'
            className='form-control my-3 py-3'
            onChange={(e) => {
              setNewPasswrod(e.target.value);
            }}
          />
          {sucsssmsg === "" ? null : (
            <div className='alert alert-success'>
              Your {sucsssmsg} sucssfuly
            </div>
          )}
          <button
            type='button'
            className=' btn btn-success my-4 w-25 p-3'
            onClick={() => {
              resetforgotPassword();
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
              "Reset..."
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetForgetPassword;
