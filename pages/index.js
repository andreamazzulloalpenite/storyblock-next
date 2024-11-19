import Head from "next/head";

import {
	useStoryblokState,
	getStoryblokApi,
	StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
	story = useStoryblokState(story);

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<h1>{story ? story.name : "My Site"}</h1>
			</header>

			<StoryblokComponent blok={story.content} />
		</div>
	);
}

// export async function getStaticProps() {
// 	// let slug = "home";
// 	let slug = "newcontentstory";

// 	let sbParams = {
// 		version: "draft", // or 'published'
// 	};

// 	const storyblokApi = getStoryblokApi();
// 	let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

// 	return {
// 		props: {
// 			story: data ? data.story : false,
// 			key: data ? data.story.id : false,
// 		},
// 		revalidate: 3600,
// 	};
// }

// serve rside rendering
export async function getServerSideProps(context) {
	// get the query object
	const insideStoryblok = context.query._storyblok;

	// let slug = "home";
	let slug = "newcontentstory";

	let sbParams = {
		version: "draft", // or 'draft'
	};

	if (insideStoryblok) {
		sbParams.version = "draft";
	}

	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

	return {
		props: {
			story: data ? data.story : false,
			key: data ? data.story.id : false,
		},
	};
}
