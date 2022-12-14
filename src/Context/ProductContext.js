import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  // const [categories, setCategories] = useState()
  // const [category, setCategory] = useState("/products")

  const [productID, setProductID] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true)
  //   const getCategories = async () => {
  //     let categoriesData
  //     await axios("https://fakestoreapi.com/products/categories").then(
  //       (res) =>
  //         (categoriesData = res.data.map((item) =>
  //           item.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
  //         ))
  //     )
  //     setCategories(categoriesData)
  //   }
  //   getCategories()
  //   setLoading(false)
  // }, [])

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      await axios
        .get(
          `https://wo46x71x9h.execute-api.us-east-2.amazonaws.com/Prod/Products`,
          {
            headers: {
              "Access-Control-Allow-Origin":
                "http://sweety-bucket.s3-website.us-east-2.amazonaws.com",
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Methods,Access-Control-Allow-Origin",
              "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            },
          }
        )
        .then((res) => {
          setProductList(res.data);
          console.log(res.data);
          setLoading(false);
        });
    };
    getProductData();
  }, [product]);

  useEffect(() => {
    setLoading(true);
    const getProductDetail = async () => {
      await axios
        .get(
          `https://wo46x71x9h.execute-api.us-east-2.amazonaws.com/Prod/Products/${productID}`
        )
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        });
    };
    getProductDetail();
  }, [productID]);

  const values = {
    product,
    productList,
    productID,
    setProductID,
    // categories,
    // setCategory,
    loading,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
