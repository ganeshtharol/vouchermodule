import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../Layouts/Header";

// Pages
import Listing from "../../Components/Voucher/Listing";
import ProductDetails from "../../Components/Voucher/ProductDetails";
import CartList from "../../Components/Voucher/Orders";



const Private = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route exact path="/" element={<Listing />} />
				<Route exact path="/list" element={<Listing />} />
				<Route exact path="/productDetails/:id" element={<ProductDetails />} />
				<Route exact path="/orders" element={<CartList />} />
			</Routes>
		</>);
};

export default Private;
