import React from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../Cart/cart.slice";
import { RootState } from "../store";
import { getProductsSelector, Product, removeProduct, selectAllProducts, selectProductById, selectProductEntities, selectProductIds, selectTotalRecords } from "./products.slice";
import { useAppDispatch } from "./store.hooks";



const ProductList: React.FC= () => {
  const products = useSelector(selectAllProducts);
  // const eft=useSelector<RootState>(state=>selectProductById(state,'eft'))
  // const totalNumber=useSelector(selectTotalRecords)
  // const productids=useSelector(selectProductIds)
  // const entities=useSelector(selectProductEntities)
  // console.log(productids)
  // console.log(totalNumber)
  // console.log(eft)
  // console.log(products)
  // console.log(entities)
  // console.log(entities['eft'])

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

