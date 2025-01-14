/* eslint-disable @next/next/no-img-element */
import { PostType } from "@/lib/blog_api";
import * as React from "react";
import dateFormatter from "@/lib/date_formatter";
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
			<div className="max-w-[85ch] mx-auto">
				<h1>{post.title}</h1>
			</div>
			{post.tags && (
				<div className="flex place-items-center">
					{post.tags.split(",").map((tag) => {
						return (
							<div
								key={tag}
								className="bg-purpear-100 dark:bg-purple-400/10 border border-purpear-200 dark:border-purpear-200/10 italic font-medium text-sm py-1 px-3 mr-2 rounded-md inline-block"
							>
								#{tag}
							</div>
						);
					})}
				</div>
			)}
			<div className="max-w-[85ch] mx-auto">
				<p className="text-base">{post.excerpt}</p>
			</div>
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
			<div className="max-w-[85ch] mx-auto">
				<h3>Table of Contents</h3>
				<div dangerouslySetInnerHTML={{ __html: post.content }} />
				<div className="my-24">
					<Squiggle />
					<br />
					<div className="font-serif my-2">Author</div>
					<div className="font-sans text-xl font-medium">
						{post.author.name}
					</div>
				</div>
			</div>
		</div>
	);
}
