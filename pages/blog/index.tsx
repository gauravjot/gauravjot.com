import * as React from "react";
import { getAllPosts } from "@/lib/blog_api";
import { PostType } from "@/lib/blog_api";
import Head from "next/head";
import Topbar, { Page } from "@/components/Topbar";
import Footer from "@/components/Footer";
import dateFormatter from "@/lib/date_formatter";
import Link from "next/link";
import Squiggle from "@/components/utils/Squiggle";

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
				<meta property="og:url" content={`https://gauravjot.com/blog`} />
				<meta property="og:title" content="Blog - Gauravjot Garaya" />
				<meta
					property="og:description"
					content="Here you'll find a collection of my latest musings, opinions, and insights on a variety of topics. From personal experiences to professional advice, I share my thoughts with the aim of inspiring, informing, and entertaining my readers."
				/>
				<meta property="og:locale" content="en_US" />
			</Head>
			<Topbar current={Page.BLOG} />
			<div className="py-8 lg:py-10"></div>
			<div className="container mx-auto py-8">
				<h1 className="my-2 mb-4 lg:my-8">Blog</h1>
				<p className="my-2 lg:my-6 lg:leading-9 lg:text-[1.05rem]">
					Welcome to my blog page! Here you&#39;ll find a collection of my
					latest musings, opinions, and insights on a variety of topics. From
					personal experiences to professional advice, I share my thoughts with
					the aim of inspiring, informing, and entertaining my readers.{" "}
				</p>
				<div className="my-10 lg:my-14">
					<Squiggle />
				</div>
				<h2>Latest Posts</h2>
				{allPosts && allPosts.length > 0 ? (
					allPosts.map((post) => {
						return <Article key={post.slug} post={post} />;
					})
				) : (
					<div className="text-center py-14 border px-4 dark:border-gray-200/20 rounded-xl my-8 blog-content">
						No blog post yet, but you can write one under <code>/blog</code>{" "}
						directory of this project.
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

function Article({ post }: { post: PostType }) {
	return (
		<div className="block my-8">
			<h4 className="font-serif leading-[1.75rem] my-2">
				<Link
					href={"/blog/" + post.slug}
					className=" text-black hover:text-black dark:text-white hover:dark:text-white hover:underline underline-offset-4"
				>
					{post.title}
				</Link>
			</h4>
			<div className="my-1.5 leading-4 dark:text-gray-300 text-gray-400 font-sans">
				{dateFormatter(post.date)} - {post.author.name}
			</div>
			<p className="my-2 font-sans lg:text-[1.05rem]">
				{post.excerpt}{" "}
				<Link
					href={"/blog/" + post.slug}
					className=" text-black hover:text-black dark:text-white hover:dark:text-white hover:underline underline-offset-4"
				>
					Read more...
				</Link>
			</p>
		</div>
	);
}
