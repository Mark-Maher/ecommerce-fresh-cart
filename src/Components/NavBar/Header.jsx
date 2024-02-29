import React, {useContext, useEffect} from "react";
import styles from "./Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link, NavLink, useNavigate} from "react-router-dom";
import logo from "../../Project Assests/images/freshcart-logo.svg";
import {FaFacebook} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa6";
import {FaLinkedin} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaArrowRightToBracket} from "react-icons/fa6";
import {FaTwitter} from "react-icons/fa";

import {Button, NavItem} from "react-bootstrap";
import {TokenContext} from "../../Context/Token";
import {cartContext} from "../../Context/CartContext";

function NavBar() {
  const {token, setToken} = useContext(TokenContext);

  const {
    numOfCartItems,
    getCart,
    setNumOfCartItems,
    getToWishlist,
    numOfWishList,
    setNumOfWishList,
  } = useContext(cartContext);
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  }
  useEffect(() => {
    (async () => {
      let data = await getCart();
      setNumOfCartItems(data?.numOfCartItems);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let data = await getToWishlist();
      setNumOfWishList(data?.count);
    })();
  }, []);

  return (
    <Navbar expand='lg' className='bg-body-tertiary py-3 fixed-top '>
      <Container>
        <Navbar.Brand as={NavLink} to={"home"}>
          <img src={logo} alt='webSite-logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'>
          <i className='fa-solid fa-bars'></i>
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          {token ? (
            <Nav className='mx-auto ms-6'>
              <Nav.Link as={NavLink} to={"home"}>
                Home
              </Nav.Link>{" "}
              <Nav.Link as={NavLink} to={"products"}>
                Products
              </Nav.Link>{" "}
              <Nav.Link as={NavLink} to={"categories"}>
                Categories
              </Nav.Link>{" "}
              <Nav.Link as={NavLink} to={"brands"}>
                Brands
              </Nav.Link>{" "}
              <Nav.Link as={NavLink} to={"allorders"}>
                All Orders{" "}
                <i className='fa-solid fa-bag-shopping fs-5 ms-1'></i>
              </Nav.Link>{" "}
              <Nav.Link
                as={NavLink}
                to={"wishlist"}
                className='position-relative '
              >
                wish list <i className='fa-solid fa-heart fs-5 ms-1'></i>
                {numOfWishList ? (
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                    {numOfWishList}
                    <span className='visually-hidden'>unread messages</span>
                  </span>
                ) : (
                  ""
                )}
              </Nav.Link>{" "}
              <Nav.Link as={NavLink} to={"cart"} className='position-relative '>
                Cart <i className='fa-solid fa-cart-plus fs-5'></i>{" "}
                {numOfCartItems ? (
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                    {numOfCartItems}
                    <span className='visually-hidden'>unread messages</span>
                  </span>
                ) : (
                  ""
                )}
              </Nav.Link>{" "}
            </Nav>
          ) : null}

          <Nav className='ms-auto '>
            {token ? (
              <>
                {" "}
                <ul className='list-unstyled d-flex mb-0 align-items-center ms-2'>
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
                <Nav.Link as={NavLink} to={"profile"}>
                  Profile <i className='fa-solid fa-user fs-5 ms-2'></i>
                </Nav.Link>{" "}
                <Nav.Link onClick={logOut}>
                  Logout{" "}
                  <i className='fa-solid fa-arrow-right-to-bracket fs-5'></i>
                </Nav.Link>
              </>
            ) : (
              <>
                {" "}
                <ul className='list-unstyled d-flex mb-0 align-items-center ms-2'>
                  <li className='mx-2'>
                    <FaLinkedin />
                  </li>{" "}
                  <li className='mx-2'>
                    <FaGithub />
                  </li>
                </ul>
                <Nav.Link as={NavLink} to={"login"}>
                  Login
                </Nav.Link>{" "}
                <Nav.Link as={NavLink} to={"register"}>
                  Register
                </Nav.Link>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
