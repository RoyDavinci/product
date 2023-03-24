import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/stateContext";
import { fireworks } from "@/lib/utils";

export const Success = () => {
	const { reset } = useStateContext();
	const [order, setOrder] = useState();

	useEffect(() => {
		localStorage.clear();
		reset();
		fireworks();
	}, []);

	return (
		<div className='success-wrapper'>
			{" "}
			<div className='success'>
				<p className='icon'>
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your order!</h2>
				<p className='email-msg'>Check your email inbox for receipt</p>
				<p className='desc'>
					If you have any questions please email{" "}
					<a href='mailto:emsthias33@gmail.com' className='email'>
						emsthias33@gmail.com
					</a>
				</p>
				<Link href='/'>
					<button type='button' className='btn' width='300px'>
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
