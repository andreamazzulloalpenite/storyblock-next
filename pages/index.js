import Head from "next/head";

import {
	useStoryblokState,
	getStoryblokApi,
	StoryblokComponent,
} from "@storyblok/react";
import Layout from "../components/Layout";

export default function Home({ story, locales, locale, defaultLocale }) {
	story = useStoryblokState(story, {
		language: locale,
	});

	return (
		<div>
			<Head>
				<title>Alpenite news</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout locales={locales} locale={locale} defaultLocale={defaultLocale}>
				<StoryblokComponent blok={story.content} locale={locale} />
			</Layout>
		</div>
	);
}

export async function getStaticProps({ locales, locale, defaultLocale }) {
	// "home" è il nome del componente home (root, pagina iniziale del sito) su storyblok
	const mainSlug = "home";

	let sbParams = {
		version: "draft", // or 'published'
		language: locale,
		resolve_relations: ["popular-articles.articles"],
	};

	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${mainSlug}`, sbParams);

	return {
		props: {
			locales,
			locale,
			defaultLocale,
			story: data ? data.story : false,
			key: data ? data.story.id : false,
		},
		revalidate: 3600,
	};
}

// SSR serve rside rendering
// export async function getServerSideProps(context) {
// 	// get the query object
// 	const insideStoryblok = context.query._storyblok;

// 	let slug = "home";

// 	let sbParams = {
// 		version: "draft", // or 'draft'
// 	};

// 	if (insideStoryblok) {
// 		sbParams.version = "draft";
// 	}

// 	const storyblokApi = getStoryblokApi();
// 	let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

// 	return {
// 		props: {
// 			story: data ? data.story : false,
// 			key: data ? data.story.id : false,
// 		},
// 	};
// }
