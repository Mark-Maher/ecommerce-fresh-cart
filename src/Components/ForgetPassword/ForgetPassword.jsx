import React, {useState} from "react";
import styles from "./ForgetPassword.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";
function ForgetPassword() {
  let [email, setEmail] = useState("");
  let [sucsssmsg, setSucssMsg] = useState("");
  let [errormsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(false);

  let navigate = useNavigate();

  async function forgotPassword() {
    try {
      setloading(true);
      let data = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {email}
      );
      setSucssMsg(data.data.message);
      setloading(false);

      navigate("/verfiyforgetpassword");
    } catch (err) {
      setErrorMsg("Can't find this email address");
    }
  }
  return (
    <>
      <div className='container py-5 mt-5 px-4'>
        <div className='row'>
          <h2 className='fs-1 fw-bold my-2 text-main pb-3'>
            please enter your email to send verification code
          </h2>
          <input
            type='email'
            placeholder='please enter your email...'
            className='form-control my-3 py-3'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errormsg === "" ? null : (
            <div className='alert alert-danger'>{errormsg}</div>
          )}
          {sucsssmsg === "" ? null : (
            <div className='alert alert-success'>
              Your {sucsssmsg} sucssfuly
            </div>
          )}
          <button
            type='button'
            className=' btn btn-success my-4 w-25 p-3'
            onClick={() => {
              forgotPassword();
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
              "Verify..."
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
