import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addProductAsync, getErrorMessage, Product } from "./products.slice";
import { useAppDispatch } from "./store.hooks";


const ProductForm: React.FC = () => {
  const [product,setProduct]=useState<Product>({
    id:'',
    title:'',
    price:0
  })

  const dispatch=useAppDispatch()
  const errorMessage=useSelector(getErrorMessage)

  const handleChange=({target:{name,value}}:React.ChangeEvent<HTMLInputElement>)=>{
    setProduct(prev=>{
      (prev as any)[name]=value
      const newValue={...prev}
      return newValue
    })
  }

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    // console.log({product})
    dispatch(addProductAsync(product))
  }

  const {title,price,id}=product
  return (
    <>
      <h2>Add Game to store</h2>
      {errorMessage && <span>{errorMessage}</span>}
      <form onSubmit={handleSubmit}>
        <input style={{border :errorMessage ? '1px solid red':'1px solid black'}} type="text" placeholder="game title" name="title" value={title} onChange={handleChange} />
        <input style={{border :errorMessage ? '1px solid red':'1px solid black'}} type="number" placeholder="price" name="price" value={price} onChange={handleChange} />
        <input style={{border :errorMessage ? '1px solid red':'1px solid black'}} type="text" placeholder="id" name="id" value={id} onChange={handleChange}/>
        <button style={{backgroundColor :errorMessage ? 'red' : 'lightgray'}} type="submit">Add Price</button>
      </form>
    </>
  );
};

export default ProductForm;

