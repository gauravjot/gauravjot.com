"use server";

import React, { useState } from "react";
import Head from "next/head";
import ScrollToTopBtn from "@/components/utils/ScrollToTopButton";
import matter from "gray-matter";
import { useRouter } from "next/router";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";

type Post = {
	title: string;
	content: string;
};

export default function Post() {
	const router = useRouter();
	const { query } = router;
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const checkboxRef = React.useRef<HTMLInputElement>(null);
	const [url, setUrl] = useState<string | null>(null);
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	React.useEffect(() => {
		if (url) {
			getContent(url)
				.then((post) => {
					setLoading(false);
					setPost(post);
					setError(null);
				})
				.catch((e) => {
					setLoading(false);
					setPost(null);
					setError("Error fetching content");
				});
		}
	}, [url]);

	React.useEffect(() => {
		let u = query["url"] as string;
		if (u && (u.startsWith("http://") || u.startsWith("https://"))) {
			setUrl("https://corsproxy.io/?" + u);
			setLoading(true);
			setError(null);
		} else {
			setLoading(false);
			setError("Invalid URL");
		}
	}, [query]);

	return loading ? (
		<div className="container mx-auto">
			<div className="flex items-center justify-center h-64">
				<div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
			</div>
		</div>
	) : post !== null ? (
		<div className="blog-content">
			<Head>
				<title>{post.title}</title>
			</Head>
			<article className="container mx-auto">
				<div dangerouslySetInnerHTML={{ __html: post.content }} />
				{query["hide_footer"] !== "true" && (
					<p className="pt-2 border-t border-zinc-300">
						<a href="https://gauravjot.com/md-render">
							Render other Markdown
						</a>
					</p>
				)}
			</article>
			<ScrollToTopBtn />
		</div>
	) : (
		<div>
			<Head>
				<title>Markdown Renderer</title>
			</Head>
			<div className="container p-4 mx-auto">
				<h1 className="font-sans text-lg">Enter URL to markdown file</h1>
				<textarea
					className="w-full p-2 mt-2 font-sans border border-gray-300 rounded-lg shadow-sm"
					placeholder="Enter URL to markdown file"
					ref={textAreaRef}
				/>
				<div className="flex gap-2 my-2 font-sans">
					<input
						type="checkbox"
						id="hide_footer"
						name="hide_footer"
						ref={checkboxRef}
					/>{" "}
					<label htmlFor="hide_footer" className="select-none">
						Hide footer
					</label>
				</div>
				<button
					className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg shadow-sm active:bg-blue-700"
					onClick={() => {
						if (textAreaRef.current && checkboxRef.current) {
							let u = textAreaRef.current.value;
							let hide_footer = checkboxRef.current.checked;
							if (u.startsWith("http://") || u.startsWith("https://")) {
								// set the url in the browser
								router.push(
									`/md-render?url=${u}&hide_footer=${hide_footer}`
								);
							}
						}
					}}
				>
					Render
				</button>
				{error && (
					<p className="px-2 py-1 my-6 font-sans text-red-500 border border-red-600 rounded-md">
						{error}
					</p>
				)}
			</div>
		</div>
	);
}

async function getContent(url: string) {
	const source_content = await fetch(url)
		.then((res) => res.text())
		.catch((err) => {
			console.error(err);
			return "";
		});
	const { data, content } = matter(source_content);
	const htmlContent = await markdownToHtml(content || "");

	let title = "Markdown Renderer";
	if (typeof data["title"] !== "undefined") {
		title = data["title"];
	}

	return htmlContent.length > 0
		? {
				title: title,
				content: htmlContent,
		  }
		: null;
}

export async function getServerSideProps(context: any) {
	const { paramName } = context.query;

	return {
		props: {
			paramValue: paramName || null,
		},
	};
}

async function markdownToHtml(markdown: string) {
	let result = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeFormat)
		.use(rehypeStringify)
		.use(rehypePrism)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: "append" })
		.process(markdown);

	return result.toString();
}
