import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkPrism from "remark-prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";

export default async function markdownToHtml(markdown: string) {
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
		.use(require("@jsdevtools/rehype-toc"))
		.process(markdown);

	return result.toString();
}
