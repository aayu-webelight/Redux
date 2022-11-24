import React, { useState } from "react";
import { addProduct, Product } from "./products.slice";
import { useAppDispatch } from "./store.hooks";


const ProductForm: React.FC = () => {
  const [product,setProduct]=useState<Product>({
    id:'',
    title:'',
    price:0
  })

  const dispatch=useAppDispatch()

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
    dispatch(addProduct(product))
  }

  const {title,price,id}=product
  return (
    <>
      <h2>Add Game to store</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="game title" name="title" value={title} onChange={handleChange} />
        <input type="number" placeholder="price" name="price" value={price} onChange={handleChange} />
        <input type="text" placeholder="id" name="id" value={id} onChange={handleChange}/>
        <button type="submit">Add Price</button>
      </form>
    </>
  );
};

export default ProductForm;

