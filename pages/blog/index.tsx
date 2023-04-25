import * as React from "react";
import { getAllPosts } from "@/lib/blog_api";
import { PostType } from "@/lib/blog_api";
import Head from "next/head";
import Topbar, { Page } from "@/components/Topbar";
import Footer from "@/components/Footer";
import dateFormatter from "@/lib/date_formatter";

type Props = {
	allPosts: PostType[];
};

export const getStaticProps = async () => {
	const allPosts = getAllPosts([
		"title",
		"date",
		"slug",
		"author",
		"coverImage",
		"excerpt",
	]);

	return {
		props: { allPosts },
	};
};

export default function BlogHome({ allPosts }: Props) {
	return (
		<div>
			<Head>
				<title>Blog - Gauravjot Garaya</title>
			</Head>
			<Topbar current={Page.BLOG} />
			<div className="py-10"></div>
			<div className="container mx-auto py-8">
				{allPosts && allPosts.length > 0 ? (
					allPosts.map((post) => {
						return <Article key={post.slug} post={post} />;
					})
				) : (
					<></>
				)}
			</div>
			<Footer />
		</div>
	);
}

function Article({ post }: { post: PostType }) {
	return (
		<a
			href={"/blog/" + post.slug}
			className="block my-6 hover:bg-gray-300/20 hover:dark:bg-gray-500/10 rounded px-6 py-4"
		>
			<h3 className="font-serif leading-[3rem]">{post.title}</h3>
			<div className="my-1 dark:text-gray-300 text-gray-400 font-sans">
				{dateFormatter(post.date)} - {post.author.name}
			</div>
			<div className="my-4 leading-9 font-sans text-[1.125rem]">{post.excerpt}</div>
		</a>
	);
}
