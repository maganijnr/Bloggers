import React from "react";
import Navbar from "../components/molecules/Navbar";

const WebLayout = ({ children }) => {
	return (
		<div className="w-full h-full relative">
			<Navbar />
			<>{children}</>
		</div>
	);
};

export default WebLayout;
