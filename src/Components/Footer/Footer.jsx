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
    <MDBFooter
      // bgColor='bg-body-tertiary'
      className='text-center text-lg-start text-muted mt-5 bg-body-tertiary pt-5'
    >
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <ul className='list-unstyled d-flex mb-0 align-items-center ms-2'>
            <li className='mx-2'>
              {" "}
              <Link
                to='https://www.facebook.com/mark.maher.102'
                target='_blank'
                className='text-dark'
              >
                {" "}
                <FaFacebook />
              </Link>
            </li>
            <li className='mx-2'>
              <Link
                to={
                  "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fmark.maher_%3Figsh%3DMTR1MWRoM2MxYmszZQ%253D%253D%26utm_source%3Dqr%26fbclid%3DIwAR13aEX454JE6Kk1eaYAi714D6tXg70rIPt_-HRmbO87IL7uC62sq5PkS_A&h=AT2yoi_SzyrzP4sVcRe-NX7ZSePKRYbXmz5YutVVJkTymPpVUXYoM1zYWPyuCVHy_KmfUzTiPw2UyOPd_gr1ZNhSUIUpaQUBSlchxDd-gAK2CAjFdLKeODwe-zh6-5YEr9lopA"
                }
                target='_blank'
                className='text-dark'
              >
                {" "}
                <FaInstagram />
              </Link>
            </li>
            <li className='mx-2'>
              <Link
                to={"https://www.linkedin.com/in/mark-maher-9781ab246/"}
                target='_blank'
                className='text-dark'
              >
                {" "}
                <FaLinkedin />
              </Link>
            </li>{" "}
            <li className='mx-2'>
              <Link
                to={"https://github.com/Mark-Maher"}
                target='_blank'
                className='text-dark'
              >
                {" "}
                <FaGithub />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className=''>
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
              {/* <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p> */}
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

            {/* <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol> */}

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
  );
}

export default Footer;
