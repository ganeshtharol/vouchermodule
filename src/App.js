import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import ProductList from './Components/ProductsListing';

import ProductDetails from './Components/ProductDetails';

// CSS Files
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./assets/css/style.css";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/listing" exact element={<ProductList />} /> 
            <Route path="/productDetails" exact element={<ProductDetails />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
