import React, {useContext, useEffect} from "react";
import styles from "./ProfileDetails.module.css";
import {Link, json} from "react-router-dom";
import axios from "axios";
import {useQuery} from "react-query";
import {cartContext} from "../../Context/CartContext";
function ProfileDetails() {
  let {Email, Password} = useContext(cartContext);
  console.log(Email, Password);
  console.log(localStorage.getItem("user"));

  return (
    <>
      <div className='container my-5 formDesign p-5'>
        <div className={`d-flex ${styles.userinfo}`}>
          <div className='me-4 mt-3'>
            <span className='bg-body-secondary p-3 rounded-9'>
              <i className='fa-solid fa-user fs-5  '></i>
            </span>
          </div>
          <div>
            <h2 className='animate__animated animate__fadeInRight text-main mb-3 '>
              Your Info
            </h2>

            <p>
              Email :{" "}
              <span className='fw-bold'>
                {JSON.parse(localStorage.getItem("userEmail"))}
              </span>
            </p>
            <p>
              Password :{" "}
              <span className='fw-bold'>
                {JSON.stringify(localStorage.getItem("userPassword"))}
              </span>
            </p>
            <p>
              Role : <span className='fw-bold'>user</span>
            </p>
          </div>
        </div>
        <div className=' p-3 my-3 _input_xebgj_29'>
          <Link className='text-main  ' to={"/updateData"}>
            <i class='fa-solid fa-pen-to-square me-2 fs-5 text-dark'></i> Update
            Your Data
          </Link>
        </div>
        <div className=' p-3 my-3 _input_xebgj_29 '>
          <Link className='text-main ' to={"/updatePassword"}>
            <i class='fa-solid fa-wrench me-2 fs-5 text-dark'></i> Update Your
            Password
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
