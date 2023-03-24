import React, { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const increaseQuantity = () => {
		return setQuantity((prev) => prev + 1);
	};
	const decreaseQuantity = () => {
		if (quantity === 1) return setQuantity(1);
		return setQuantity((prev) => prev - 1);
	};

	const reset = () => {
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
	};

	const onAdd = (product, quantity) => {
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevQuantity) => prevQuantity + quantity);
		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((item) => {
				if (item._id === product._id)
					return {
						...item,
						quantity: item.quantity + quantity,
					};
			});
			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${quantity} ${product.name}  added to cart`);
	};

	const increaseCartQuantity = (id) => {
		const foundItem = cartItems.filter((item) => item._id === id);

		if (!foundItem) return;
		else {
			foundItem[0].quantity++;
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundItem[0].price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
		}
	};
	const decreaseCartQuantity = (id) => {
		const foundItem = cartItems.filter((item) => item._id === id);

		if (!foundItem) return;
		else if (foundItem[0].quantity < 1) return;
		else {
			foundItem[0].quantity--;
			setTotalPrice((prevTotalPrice) => prevTotalPrice - foundItem[0].price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
		}
	};
	const onRemove = (product) => {
		const foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter((item) => item._id !== product._id);

		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
		);
		setCartItems(newCartItems);
	};

	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				quantity,
				increaseQuantity,
				decreaseQuantity,
				onAdd,
				setShowCart,
				onRemove,
				increaseCartQuantity,
				decreaseCartQuantity,
				reset,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
