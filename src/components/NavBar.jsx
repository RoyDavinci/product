import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "@/context/stateContext";
import { Cart } from ".";
const NavBar = () => {
	const { cartItems, setShowCart, showCart, totalQuantities } =
		useStateContext();
	return (
		<div className='navbar-container'>
			<p className='logo'>
				<Link href='/'>Beats Store</Link>
			</p>
			<button
				type='button'
				className='cart-icon'
				onClick={() => setShowCart(true)}
			>
				<AiOutlineShopping />
				<span className='cart-item-qty'>{cartItems.length}</span>
			</button>
			{showCart && <Cart />}
		</div>
	);
};

export default NavBar;
