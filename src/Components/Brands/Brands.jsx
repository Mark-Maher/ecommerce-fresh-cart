import React, {useEffect} from "react";
import styles from "./Brands.module.css";
import {Helmet} from "react-helmet";
import axios from "axios";
import {useQuery} from "react-query";
import Loader from "../Loader/Loader";
function Brands() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let {data, isError, isLoading, error} = useQuery(
    "CategoriesProducts",
    getProducts
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {" "}
      <Helmet>
        <title>Brands Page</title>
      </Helmet>{" "}
      {isError && <div className='alert alert-danger'>{error}</div>}
      {isLoading ? (
        <Loader />
      ) : (
        <div className='container py-5 px-3'>
          <h2 className='fs-1 fw-bold my-5 text-main pb-3 animate__animated animate__fadeInDownBig'>
            All Brands{" "}
          </h2>
          <div className='row g-4 gx-4 animate__animated animate__fadeInUpBig'>
            {data?.data?.data?.map((item, id) => {
              return (
                <div className='col-md-3 ng-star-inserted px-3' key={id}>
                  <div className='card '>
                    {" "}
                    <img
                      src={item.image}
                      alt=''
                      className='w-100 rounded'
                      height={250}
                    />
                    <h3 className='text-center my-4 text-main fw-bolder'>
                      {item.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Brands;
