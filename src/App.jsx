import {RouterProvider, createBrowserRouter} from "react-router-dom";
import "./App.css";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import {TokenContext} from "./Context/Token";
import {useContext, useEffect} from "react";
import ProtectRoutes from "./Components/ProtectRoutes/ProtectRoutes";
import LoginProtectRoutes from "./Components/LoginProtectRoutes/LoginProtectRoutes";
import {QueryClient, QueryClientProvider} from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import {Offline, Online} from "react-detect-offline";
import CartContextProvider, {cartContext} from "./Context/CartContext";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Address from "./Components/Address/Address";
import MyOrders from "./Components/MyOrders/MyOrders";
import WishList from "./Components/WishList/WishList";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerfiyForgetPassword from "./Components/VerfiyForgetPassword/VerfiyForgetPassword";
import ResetForgetPassword from "./Components/ResetForgetPassword/ResetForgetPassword";

function App() {
  const {setToken, TokenContextProvider} = useContext(TokenContext);
  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setToken(localStorage.getItem("user"));
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          path: "home",
          element: (
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          ),
        },
        {
          path: "",
          element: (
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          ),
        },
        // {index: true, element: <Home />},
        {
          path: "ecommerce_freshcart/",
          element: <Login />,
        },
        {
          path: "/product-details/:productID",
          element: (
            <ProtectRoutes>
              <ProductDetails />
            </ProtectRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectRoutes>
              <WishList />
            </ProtectRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectRoutes>
              <Products />
            </ProtectRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectRoutes>
              <Categories />
            </ProtectRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectRoutes>
              <MyOrders />
            </ProtectRoutes>
          ),
        },
        {
          path: "address/:cartId",
          element: (
            <ProtectRoutes>
              <Address />
            </ProtectRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectRoutes>
              <Brands />
            </ProtectRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectRoutes>
              <Cart />
            </ProtectRoutes>
          ),
        },
        {
          path: "forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "verfiyforgetpassword",
          element: <VerfiyForgetPassword />,
        },
        {
          path: "resetforgetpassword",
          element: <ResetForgetPassword />,
        },
        {
          path: "login",
          element: (
            <LoginProtectRoutes>
              <Login />
            </LoginProtectRoutes>
          ),
        },

        {
          path: "register",
          element: (
            <LoginProtectRoutes>
              <Register />
            </LoginProtectRoutes>
          ),
        },
        {path: "*", element: <NotFound />},
      ],
    },
  ]);
  const query = new QueryClient();
  return (
    <>
      <div>
        <Offline>
          <div className='alert alert-danger position-fixed bottom-0 left-0 z-3 ms-3'>
            Oops! : Your Are Offline
          </div>
        </Offline>
      </div>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <RouterProvider router={routes}></RouterProvider>
          <ToastContainer />
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
