import * as React from "react";
import data from "@/json/tools.json";

interface Tool {
	name: string;
	url: string;
	short_desc: string;
	tags: string;
}

export default function Tools() {
	return (
		<section id="projects" className="container mx-auto">
			<h2 className="my-4">Tools</h2>
			<p>
				These are some of the tools I have developed for ease of development or
				for community.
			</p>
			<div className="grid grid-cols-2 gap-4 mt-8">
				{data.tools.length > 0 &&
					data.tools.map((tool: Tool, index) => {
						return <ToolItem key={tool.name} tool={tool} />;
					})}
			</div>
		</section>
	);
}

function ToolItem(props: { tool: Tool }) {
	return (
		<a
			href={props.tool.url}
			rel="noreferrer"
			target="_blank"
			className="col-span-2 md:col-span-1 inline-block hover:no-underline"
		>
			<div className="dark:bg-gray-900/20 bg-gray-50 hover:dark:bg-gray-900/40 hover:bg-gray-100 p-4 rounded-lg border dark:border-gray-800">
				<h4 className="mb-2 text-black dark:text-white">{props.tool.name}</h4>
				<p className="text-sm leading-6 dark:text-gray-300">
					{props.tool.short_desc}
				</p>
				<div className="flex gap-2 mt-4">
					{props.tool.tags.split(",").map((tag) => {
						return (
							<div
								key={tag}
								className="bg-gray-200/50 dark:bg-gray-700/50 rounded-md px-1 py-0.5 text-xs tracking-tight"
							>
								{tag}
							</div>
						);
					})}
				</div>
			</div>
		</a>
	);
}
