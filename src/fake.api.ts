import { Product } from "./Products/products.slice";

const validateProduct=(product:Product):Promise<Product>=> new Promise((resolve,reject)=>setTimeout(()=>{
    if(product.title.length===0){
        reject('no title')
    }
    if(product.price<=0){
        reject('price is incorrect')
    }
    resolve(product)
},5000))

export default validateProduct;