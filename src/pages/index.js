import { client } from "@/lib/client";
import React from "react";
import { Footer, HeroBanner, FooterBanner, Product } from "../components/index";

const Home = ({ product, banner }) => {
	return (
		<div>
			<HeroBanner heroBanner={banner && banner[0]} />
			<div className='products-heading'>
				<h2>Best Selling Products</h2>
				<p>Speakers of many variations</p>
			</div>
			<div className='products-container'>
				{product?.map((item, index) => {
					return <Product key={index} product={item}></Product>;
				})}
			</div>
			<FooterBanner footer={banner && banner[0]} />
		</div>
	);
};

export const getServerSideProps = async () => {
	const query = '*[_type ==  "product"]';
	const product = await client.fetch(query);
	const bannerQuery = '*[_type  == "banner"]';
	const banner = await client.fetch(bannerQuery);

	return {
		props: {
			product,
			banner,
		},
	};
};

export default Home;
