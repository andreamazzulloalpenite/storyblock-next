import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";
import Hero from "../components/Hero";
import Article from "../components/Article";
import AllArticles from "../components/AllArticles";
import PopularArtices from "../components/PopularArticles";

// questi sono i componenti su Storyblok
// [nome_component_storyblok]: [nome_componente_next]
const components = {
	feature: Feature,
	grid: Grid,
	teaser: Teaser,
	article: Article,
	"all-articles": AllArticles,
	"popular-articles": PopularArtices,
	hero: Hero,
	page: Page,
};

storyblokInit({
	accessToken: "WM5msFai6QKivKKhor4QXwtt",
	use: [apiPlugin],
	components,
	apiOptions: {
		region: "",
	},
});

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
