import { getPostBySlug, getAllPosts } from "@/lib/blog_api";
import Head from "next/head";
import markdownToHtml from "@/lib/md_to_html";
import { PostType } from "@/lib/blog_api";
import Footer from "@/components/Footer";
import Topbar, { Page } from "@/components/Topbar";
import { BlogPost } from "@/components/blog/BlogPost";
import ScrollToTopBtn from "@/components/utils/ScrollToTopButton";

type Props = {
	post: PostType;
	morePosts: PostType[];
	preview?: boolean;
};

export default function Post({ post }: Props) {
	const title = `${post.title} - Gauravjot Garaya's Blog`;

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta property="og:image" content={post.ogImage.url} />
			</Head>
			<Topbar current={Page.BLOG_POST} />
			<article className="container mx-auto">
				<BlogPost post={post} />
			</article>
			<Footer />
			<ScrollToTopBtn />
		</div>
	);
}

type Params = {
	params: {
		slug: string;
	};
};

export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.slug, [
		"title",
		"date",
		"slug",
		"author",
		"content",
		"ogImage",
		"coverImage",
	]);
	const content = await markdownToHtml(post.content || "");

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
}

export async function getStaticPaths() {
	const posts = getAllPosts(["slug"]);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}