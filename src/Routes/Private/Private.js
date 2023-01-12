import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../Layouts/Header";

// Pages
import Listing from "../../Components/Voucher/Listing";
import ProductDetails from "../../Components/Voucher/ProductDetails";
import CartList from "../../Components/Voucher/Cart";



const Private = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route exact path="/" element={<Listing />} />
				<Route exact path="/list" element={<Listing />} />
				<Route exact path="/productDetails" element={<ProductDetails />} />
				<Route exact path="/cart" element={<CartList />} />
			</Routes>
		</>);
};

export default Private;
