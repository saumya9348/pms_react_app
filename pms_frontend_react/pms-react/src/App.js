import Demo from "./myfolder/Demo";
import "./App.css";
import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
function show(){
  return(
    <div>
      
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/AddProduct" element={<AddProduct />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default show;