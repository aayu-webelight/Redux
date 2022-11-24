import { Provider } from "react-redux";
import "./App.css";
import Cart from "./Cart/Cart";
import ProductList from "./Products/Product-list";
import ProductForm from "./Products/ProductForm";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductList />
        <ProductForm />
        <Cart/>
      </div>
    </Provider>
  );
}

export default App;

