import ArticleTeaser from "./ArticleTeaser";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";

import { useState, useEffect } from "react";

const AllArticles = ({ blok }) => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const getArticles = async () => {
			const storyblokApi = getStoryblokApi();
			const { data } = await storyblokApi.get(`cdn/stories`, {
				version: "draft", // or 'published'
				starts_with: "blog/",
				is_startpage: false,
			});

			setArticles((prev) => {
				console.log(data.stories);

				// Ottieni la data odierna in formato "yyyy-mm-dd"
				const today = new Date().toISOString().split("T")[0]; // "yyyy-mm-dd"

				return data.stories
					.filter((a) => {
						// Estrarre solo la parte "yyyy-mm-dd" dalla data
						const articleDate = a.content.body[0].date.split(" ")[0];
						return articleDate >= today; // Filtra date >= oggi
					})
					.sort((a, b) => {
						// Converti le date in oggetti Date per confrontarle
						const dateA = new Date(a.content.body[0].date);
						const dateB = new Date(b.content.body[0].date);
						return dateA - dateB; // Ordina dalla più vecchia alla più futura
					})
					.map((article) => {
						// Aggiungi la proprietà slug all'articolo
						article.content.slug = article.slug;
						return article;
					});
			});
		};
		getArticles();
	}, []);

	return (
		<>
			<p className="text-3xl">{blok.title}</p>
			<div
				className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3 lg:px-24 md:px-16"
				{...storyblokEditable(blok)}
			>
				{articles[0] &&
					articles.map((article) => (
						<ArticleTeaser article={article.content} key={article.uuid} />
					))}
			</div>
		</>
	);
};
export default AllArticles;
