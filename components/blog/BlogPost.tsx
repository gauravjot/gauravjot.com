/* eslint-disable @next/next/no-img-element */
import { PostType } from "@/lib/blog_api";
import * as React from "react";
import dateFormatter from "@/lib/date_formatter";
import "prismjs/themes/prism-tomorrow.css";
import Squiggle from "../utils/Squiggle";

export interface IBlogPostProps {
	post: PostType;
}

export function BlogPost(props: IBlogPostProps) {
	const post = props.post;
	return (
		<div className="blog-content">
			<div className="mt-10 text-gray-400 dark:text-gray-300">
				{post.date === post.edited
					? dateFormatter(post.date)
					: `Edited: ${dateFormatter(post.edited)}`}{" "}
				— {post.author.name}
			</div>
			<h1 className="!mt-4">{post.title}</h1>
			<div className="flex place-items-center">
				{post.tags?.split(",").map((tag) => {
					return (
						<div
							key={tag}
							className="bg-purpear-100 dark:bg-purple-400/30 border border-purpear-200 dark:border-purpear-200/30 font-medium text-sm py-1 px-3 mr-2 rounded-md inline-block"
						>
							#{tag}
						</div>
					);
				})}
			</div>
			<p className="italic text-base">{post.excerpt}</p>
			<div>
				{post.coverImage ? (
					<>
						<img
							src={post.coverImage}
							alt={post.title}
							className="w-full bg-gray-100/30 rounded-lg dark:bg-gray-800/20"
						/>
					</>
				) : (
					<></>
				)}
			</div>
			<h3>Table of Contents</h3>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
			<div className="my-24">
				<Squiggle />
				<br />
				<div className="font-serif my-2">Author</div>
				<div className="font-sans text-xl font-medium">{post.author.name}</div>
			</div>
		</div>
	);
}
