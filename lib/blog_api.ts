import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// Types for Post and Author
export type PostType = {
	slug: string;
	title: string;
	date: string;
	coverImage?: string;
	author: Author;
	excerpt: string;
	ogImage: {
		url: string;
	};
	content: string;
	tags: string;
	edited: string;
};

export type Author = {
	name: string;
	picture: string;
};

// Blog md directory
const postsDirectory = join(process.cwd(), "blog");

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	type Items = {
		[key: string]: string;
	};

	const items: Items = {};

	// Ensure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === "slug") {
			items[field] = realSlug;
		}
		if (field === "content") {
			items[field] = content;
		}

		if (typeof data[field] !== "undefined") {
			items[field] = data[field];
		}
	});

	return items;
}

export function getAllPosts(fields: string[] = []) {
	const slugs = getPostSlugs().filter((slug) => {
		return !slug.startsWith("_");
	});
	const posts = slugs
		.map((slug) => getPostBySlug(slug, fields))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
	return posts;
}
