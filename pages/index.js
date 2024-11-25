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
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout locales={locales} locale={locale} defaultLocale={defaultLocale}>
				<StoryblokComponent blok={story.content} />
			</Layout>
		</div>
	);
}

export async function getStaticProps({
	params,
	locales,
	locale,
	defaultLocale,
}) {
	const mainSlug = "home";
	// let slug = params.slug ? params.slug.join("/") : mainSlug;
	let slug = mainSlug;

	let sbParams = {
		version: "draft", // or 'published'
		language: locale,
		resolve_relations: ["popular-articles.articles"],
	};

	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

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

// serve rside rendering
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
