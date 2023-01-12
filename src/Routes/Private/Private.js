import React from "react";
import { Route, Routes } from "react-router-dom";
import Listing from "../../Components/Voucher/Listing";
import Header from "../../Layouts/Header";

const Private = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route exact path="/" element={<Listing />} />

			</Routes>
		</>);
};

export default Private;
