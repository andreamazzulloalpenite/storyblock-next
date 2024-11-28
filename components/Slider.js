import React, { useEffect } from "react";
import ArticleTeaser from "./ArticleTeaser";

const Slider = ({ blok }) => {
	useEffect(() => {
		if (typeof window !== "undefined" && window.$) {
			$(".slider").slick({
				dots: true,
				infinite: true,
				slidesToShow: 1.1,
				slidesToScroll: 1,
			});
		}
	}, []);

	return (
		<div class="slider">
			{blok.articles.map((article) => {
				console.log("slider", article);
				article.content.slug = article.slug;
				return <ArticleTeaser article={article.content} key={article.uuid} />;
				// return <div>ciao</div>;
			})}
			{/* <div>your content</div>
			<div>your content</div>
			<div>your content</div> */}
		</div>
	);
};

export default Slider;
