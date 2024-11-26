import Link from "next/link";

const ArticleTeaser = ({ article }) => {
	return (
		<div className="column feature">
			<div className="p-6">
				<h2 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">
					{article.body[0].title}
				</h2>
				<h2 className="title-font sm:text-2xl text-xl mb-4 font-medium text-gray-900">
					{article.body[0].date}
				</h2>
				<img
					className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
					src={article.body[0].image.filename}
					alt={article.body[0].image.alt}
				/>
				<div className="mx-auto text-base leading-relaxed text-gray-500 line-clamp-2">
					{article.body[0].textarea}
				</div>
				<div className="mt-4">
					<Link href={`/blog/${article.slug}`}>
						<a
							className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
							title="read more"
						>
							Read More »
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default ArticleTeaser;
