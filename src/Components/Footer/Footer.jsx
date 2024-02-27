import googlePlay from "../../Project Assests/images/google play.webp";
import appStore from "../../Project Assests/images/App store.png";
import amazon from "../../Project Assests/images/Amazon-Pay-1.png.webp";
import paypal from "../../Project Assests/images/بيبال-paypal-3.png";
import masterCard from "../../Project Assests/images/png-clipart-logo-debit-mastercard-graphics-debit-card-mastercard-text-orange.png";

import React from "react";
import styles from "./Footer.module.css";

import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";

function Footer() {
  return (
    <>
      {" "}
      <MDBFooter className='text-center text-lg-start text-muted mt-5 bg-body-tertiary pt-5'>
        <section className=''>
          <div className='container  p-5 '>
            <h5>Get the FreshCart app</h5>
            <p className='text-muted mb-2'>
              We will send you a link, open it on your phone to download the app
            </p>
            <div className='row mb-5 gy-2'>
              <div className='col-md-9'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email...'
                />
              </div>
              <div className='col-md-3 '>
                <button className='btn bg-main text-white'>
                  Share App Link
                </button>
              </div>
            </div>
            <div className='row  text-center '>
              <div className='col-md-8'>
                <div className='d-flex flex-wrap  align-items-center'>
                  <p className='mt-2'>Payment partners</p>
                  <img
                    src={amazon}
                    alt=''
                    className='ms-1'
                    style={{width: "40px"}}
                  />
                  <img
                    src={paypal}
                    alt=''
                    className='ms-1'
                    style={{width: "40px"}}
                  />
                  <img
                    src={masterCard}
                    alt=''
                    className='ms-1'
                    style={{width: "40px"}}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex flex-wrap align-items-center'>
                  <h6 className='me-1 mt-2'>Get delivers with FreshCart</h6>
                  <div>
                    <img src={googlePlay} alt='' style={{width: "65px"}} />
                    <img src={appStore} alt='' style={{width: "65px"}} />
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon='gem' className='me-3' />
                  Mark Maher
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>

                <p>
                  <a href='#!' className='text-reset'>
                    React
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    JavaScript
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    HTML,CSS
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon icon='home' className='me-2' />
                  Alexandria,Egypt{" "}
                </p>
                <p>
                  <MDBIcon icon='envelope' className='me-3' />
                  markmaher838@gmail.com
                </p>
                <p>
                  <MDBIcon icon='phone' className='me-3' /> + 01227721580
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <div
          className='text-center p-4'
          style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
        >
          © 2021 Copyright:
          <Link
            className='text-reset fw-bold text-dark'
            to={"https://www.linkedin.com/in/mark-maher-9781ab246/"}
            target='_blank'
          >
            Mark Maher
          </Link>
        </div>
      </MDBFooter>
    </>
  );
}

export default Footer;
