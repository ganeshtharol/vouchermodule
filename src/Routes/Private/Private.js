import React from "react";
import { Route, Routes } from "react-router-dom";
import Listing from "../../Components/Voucher/Listing";
import Header from "../../Layouts/Header";

const Private = () => {
	return (
		<div className="main-wrapper">
			<Header />
			<div className="main-content">
				<Routes>
					<Route exact path="/" element={<Listing />} />
					
				</Routes>
			</div>
		</div>
	);
};

export default Private;
