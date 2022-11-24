import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import validateProduct from "../fake.api";
import { RootState } from "../store";

export interface Product {
  title: string;
  price: number;
  id: string;
}

export enum ValidationState {
  Fulfilled,
  Pending,
  Rejected,
}

interface ProductSliceState {
  validationState?: ValidationState;
  errorMessage?: String;
}

export const addProductAsync = createAsyncThunk(
  "products/addNewProduct",
  async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct);
    return product;
  }
);

const initialProducts: Product[] = [
  { title: "escape", price: 60, id: "eft" },
  { title: "hunt", price: 70, id: "hunt" },
  { title: "lOOSE", price: 55, id: "hll" },
];

const productAdapter=createEntityAdapter<Product>()
const initialState=productAdapter.getInitialState<ProductSliceState>({
  errorMessage:undefined,
  validationState:undefined
})

const filledInitialState=productAdapter.upsertMany(initialState,initialProducts)

// type EntityState={
//   ids:[],
//   entities:{}
// }

const productsSlice = createSlice({
  name: "products",
  // initialState:initialState,
  initialState:filledInitialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
productAdapter.upsertOne(state,action.payload)

      // return [action.payload, ...state];

      // state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      productAdapter.removeOne(state,action.payload)
    }
    // ({
    //   ...state,
    //   products: state.products.filter(
    //     (product) => product.id !== action.payload
    //   ),
    // }),
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) =>
    {
      productAdapter.upsertOne(state,action.payload)
      state.validationState=ValidationState.Fulfilled
      state.errorMessage=undefined
    }
    //  ({
    //   ...state,
    //   validationState: ValidationState.Fulfilled,
    //   errorMessage: undefined,
    //   products: [...state.products, action.payload],
    // })
    );
    builder.addCase(addProductAsync.rejected, (state, action) => {
      return{
        ...state,
        validationState:ValidationState.Rejected,
        errorMessage:action.error.message
      }
    }
    // ({
    //   ...state,
    //   validationState: ValidationState.Rejected,
    //   errorMessage: action.error.message,
    // })
    );
    builder.addCase(addProductAsync.pending, (state, action) => ({
      ...state,
      validationState: ValidationState.Pending,
      errorMessage: undefined,
    }));
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) =>
  state.products.entities;
export const getErrorMessage = (state: RootState) =>
  state.products.errorMessage;

export const{
selectAll:selectAllProducts,
selectById:selectProductById,
selectEntities:selectProductEntities,
selectIds:selectProductIds,
selectTotal:selectTotalRecords
}=productAdapter.getSelectors<RootState>(state=>state.products)

export default productsSlice.reducer;
