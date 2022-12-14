import React, { useEffect } from "react";
import { useProduct } from "../../Context/ProductContext";
import styles from "./styles.module.css";
import Spinner from "../../Components/Spinner";
import { useParams } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";
import Card from "../../Components/Card";

const Products = () => {

  const { addToCart, product } = useCart();
  const { addToFavorite, favoriteproducts } = useFavorite();

  const { productList, loading, setProductID /*, setCategory*/ } = useProduct();


  // const {category_id} = useParams()

  // useEffect(() => {
  //   setCategory(category_id)
  // }, [category_id])

  return (
    <div className={styles.cardGroup}>
      {!loading ? (
        productList?.map((product, index) => {
          // const findCartItem = item.find((cart_item) => cart_item.id === item.id)
          // const findFavoriteItem = favoriteproducts.find((favorite_item) => favorite_item.id === product.product_id)
          return (

            <Card
              key={`product-${index}`}
              product={product}
              setProductID={setProductID}
              addToCart={addToCart}
            />

          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;
