import * as React from "react";
import { getAllPosts } from "@/lib/blog_api";
import { PostType } from "@/lib/blog_api";
import Head from "next/head";
import Topbar, { Page } from "@/components/Topbar";
import Footer from "@/components/Footer";
import dateFormatter from "@/lib/date_formatter";
import Link from "next/link";
import Squiggle from "@/components/utils/Squiggle";
import Image from "next/image";

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
	let meta_description =
		"Here you'll find a collection of my latest musings, opinions, and insights on a variety of topics. From personal experiences to professional advice, I share my thoughts with the aim of inspiring, informing, and entertaining my readers.";

	return (
		<div>
			<Head>
				<title>Blog - Gauravjot Garaya</title>
				<meta property="og:url" content={`https://gauravjot.com/blog`} />
				<meta property="og:title" content="Blog - Gauravjot Garaya" />
				<meta property="og:description" content={meta_description} />
				<meta property="og:locale" content="en_US" />
				<meta name="description" content={meta_description} />
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
		<div
			className={
				(post.coverImage &&
					"grid grid-flow-col grid-cols-8 grid-rows-1 md:grid-cols-12") +
				" my-12"
			}
		>
			<div className={post.coverImage && "col-span-8"}>
				<div className="font-serif font-bold text-[1.5rem] leading-[2rem] mb-2.5">
					<Link
						href={"/blog/" + post.slug}
						className="dark:text-gray-100 text-gray-900 hover:text-black hover:dark:text-gray-200 hover:underline underline-offset-4 tracking-wide"
					>
						{post.title}
					</Link>
				</div>
				<div className="leading-4 dark:text-gray-300 text-gray-400 font-sans text-base">
					{dateFormatter(post.date)} - {post.author.name}
				</div>
				<p className="mt-3 font-sans lg:text-[1.1rem] dark:text-gray-300 text-gray-600 tracking-wide">
					{post.excerpt}
				</p>
				<p className="pt-2 font-sans">
					<Link
						href={"/blog/" + post.slug}
						className="text-base text-gray-900 hover:text-black dark:text-gray-200 hover:dark:text-white hover:underline underline-offset-4"
					>
						Read more…
					</Link>
				</p>
			</div>
			{post.coverImage && (
				<div className="col-span-4 hidden md:block self-end pl-8">
					<div className="aspect-[2000/1169] relative">
						<Image
							src={post.coverImage}
							fill={true}
							alt={post.title}
							className="rounded-md shadow-md"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
