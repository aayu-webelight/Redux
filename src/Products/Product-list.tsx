import React from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../Cart/cart.slice";
import { getProductsSelector, Product, removeProduct } from "./products.slice";
import { useAppDispatch } from "./store.hooks";



const ProductList: React.FC= () => {
  const products = useSelector(getProductsSelector);
  const dispatch=useAppDispatch()

  const removeFromStore=(id:string)=>{
    dispatch(removeProduct(id))
  }

  const addToCartHandler=(product:Product)=>{
    dispatch(addToCart(product))
  }

  return (
    <div>
      <h2>Games List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <span> {`${product.title}:${product.price}`} </span>
          <button onClick={()=>addToCartHandler(product)}>Add To Cart</button>
          <button onClick={()=>removeFromStore(product.id)}>Remove from store</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

