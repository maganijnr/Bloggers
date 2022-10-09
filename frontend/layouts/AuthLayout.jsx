import React from "react";
import Link from "next/link";

const AuthLayout = ({ children }) => {
	return (
		<div className="w-full h-full relative">
			<div className="w-full py-10 px-5 ">
				<Link href="/">
					<a className="text-green-700 text-3xl font-extrabold italic">
						Bloggers
					</a>
				</Link>
			</div>
			<>{children}</>
		</div>
	);
};

export default AuthLayout;
