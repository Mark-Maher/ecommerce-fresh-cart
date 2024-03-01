import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import {TokenContext} from "./Token";
import {clear} from "@testing-library/user-event/dist/clear";

export let cartContext = createContext();

export default function CartContextProvider({children}) {
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  const [numOfWishList, setNumOfWishList] = useState(null);
  // const [Email, setEmail] = useState(null);
  // const [Password, setPassword] = useState(null);
  const [wishlist, setWishList] = useState([]);

  const {token} = useContext(TokenContext);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const userToken = localStorage.getItem("user");
  async function addToCart(productId) {
    try {
      const response = await axios.post(
        endpoint,
        {productId},
        {headers: {token: userToken}}
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
  async function getCart() {
    try {
      const response = await axios.get(endpoint, {headers: {token: userToken}});
      setNumOfCartItems(response?.data.numOfCartItems);
      return response?.data;
    } catch (error) {
      setNumOfCartItems(0);
      console.error("Error adding product to cart:", error);
    }
  }
  async function deleteItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {token: userToken},
        }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
  async function updateQuantity(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        {
          headers: {token: userToken},
        }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
  let payEndPoint = "";
  if (isOnlinePayment) {
    payEndPoint =
      "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/";
  } else {
    payEndPoint = "https://ecommerce.routemisr.com/api/v1/orders/";
  }
  async function payForOrder(cartID, shippingAddress) {
    try {
      const response = await axios.post(
        payEndPoint +
          cartID +
          "?url=https://ecommerce-fresh-cart-flax.vercel.app/",
        {shippingAddress},
        {
          headers: {token: userToken},
        }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
  async function addToWishlist(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {productId},
        {headers: {token: userToken}}
      );
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
  async function getToWishlist(productId) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {headers: {token: userToken}}
      );
      setWishList(response.data.data);
      setNumOfWishList(response?.data.count);
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  useEffect(() => {
    (async () => {
      let data = await getCart();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let data = await getToWishlist();
    })();
  }, []);
  return (
    <cartContext.Provider
      value={{
        addToCart,
        numOfCartItems,
        getCart,
        setNumOfCartItems,
        deleteItem,
        updateQuantity,
        payForOrder,
        setIsOnlinePayment,
        isOnlinePayment,
        addToWishlist,
        getToWishlist,
        setWishList,
        wishlist,
        setNumOfWishList,
        numOfWishList,
        // setEmail,
        // Email,
        // setPassword,
        // Password,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
