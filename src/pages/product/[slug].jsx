import React, { useState } from "react";
import { urlFor, client } from "@/lib/client";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineStar,
	AiFillStar,
} from "react-icons/ai";
import { Product } from "@/components";
import { useStateContext } from "@/context/stateContext";

const ProductDetails = ({ product, products }) => {
	const { image, price, name, details } = product;

	const [index, setIndex] = useState(0);
	const { increaseQuantity, decreaseQuantity, quantity, onAdd, setShowCart } =
		useStateContext();

	const handleCheckout = async () => {
		onAdd(product, quantity);
		setShowCart(true);
	};

	return (
		<div>
			<div className='product-detail-container'>
				<div>
					<div className='image-container'>
						<img
							src={urlFor(image && image[index])}
							alt=''
							className='product-detail-image'
						/>
					</div>
					<div className='small-images-container'>
						{image?.map((item, i) => {
							return (
								<img
									key={i}
									src={urlFor(item)}
									onMouseEnter={() => setIndex(i)}
									className={`${
										i === index ? "small-image selected-image" : "small-image"
									}`}
								></img>
							);
						})}
					</div>
				</div>
				<div className='product-detail-desc'>
					<h1>{name}</h1>
					<div className='reviews'>
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>20</p>
					</div>
					<div>
						<h4>Details</h4>
						<p>{details}</p>
						<p className='price'>$ {price}</p>
						<div className='quantity'>
							<h3>Quantity</h3>
							<p className='quantity-desc'>
								<span className='minus' onClick={() => decreaseQuantity()}>
									<AiOutlineMinus />
								</span>
								<span className='num'>{quantity}</span>
								<span className='plus' onClick={() => increaseQuantity()}>
									<AiOutlinePlus />
								</span>
							</p>
						</div>
						<div className='buttons'>
							<button
								type='button'
								className='add-to-cart'
								onClick={() => onAdd(product, quantity)}
							>
								Add To Cart
							</button>
							<button
								onClick={handleCheckout}
								type='button'
								className='buy-now'
							>
								Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='maylike-products-wrapper'>
				<h2>You may also like</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{products?.map((item, index) => {
							return <Product product={item} key={item._id} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

	const products = await client.fetch(query);
	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));
	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type ==  "product" && slug.current == '${slug}'][0]`;
	const productQuery = `*[_type ==  "product"]`;
	const product = await client.fetch(query);
	const products = await client.fetch(productQuery);

	return {
		props: {
			product,
			products,
		},
	};
};

export default ProductDetails;
