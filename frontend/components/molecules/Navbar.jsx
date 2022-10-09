import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	return (
		<div className="w-full min-h-[70px] bg-green-700 sticky left-0 top-0">
			<div className="flex items-center justify-between min-h-[70px] w-full px-5 max-w-[1440px] mx-auto relative">
				<h2 className="text-white text-3xl font-extrabold italic">
					Bloggers
				</h2>
				<div
					className={`${
						isOpen
							? "bg-green-700 absolute top-0 right-0 h-screen w-[300px] shadow-sm flex flex-col z-10 items-center justify-center space-y-10 duration-700 ease-linear transition-all"
							: "-right-[300px] duration-700 ease-linear transition-all hidden"
					}  md:flex md:flex-row md:items-center md:justify-center font-medium text-white text-xl  md:text-base space-x-5`}
				>
					<button
						className={`${
							isOpen
								? "cursor-pointer text-white absolute top-5 left-5"
								: "hidden"
						}`}
						onClick={() => setIsOpen(false)}
					>
						<FaTimes fontSize={24} />
					</button>
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/">
						<a>Top blogs</a>
					</Link>
					<Link href="/">
						<a>Blog creators</a>
					</Link>
					<div className="flex flex-col md:hidden space-y-5">
						<button
							className="bg-white text-green-700 capitalize rounded-lg px-4 py-2 hover:text-white hover:bg-green-700 duration-200 ease-linear transition-all border-2 border-white"
							onClick={() => router.push("/login")}
						>
							Sign in
						</button>
						<button onClick={() => router.push("/register")}>
							Sign up
						</button>
					</div>
				</div>
				<button
					className="block md:hidden text-white cursor-pointer"
					onClick={() => setIsOpen(true)}
				>
					<FaBars fontSize={24} />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
