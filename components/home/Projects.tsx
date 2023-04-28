import * as React from "react";
import data from "@/json/projects.json";
import Image from "next/image";
import markdownToHtml from "@/lib/md_to_html";

type ProjectItemType = {
	name: string;
	description: string;
	preview: string;
	url: string;
	git?: string;
};

const tail = {
	project: {
		link: "w-10 h-10 flex place-content-center place-items-center hover:bg-gray-200/50 dark:hover:bg-gray-200/20 rounded",
		btn: "btn-outline-light !py-2.5",
	},
};

export default function Projects() {
	return (
		<section id="projects" className="container mx-auto">
			<h2 className="my-4">Projects</h2>
			<div className="flex flex-col gap-16 lg:gap-24 mt-12">
				{data.projects.length > 0 &&
					data.projects.map((project: ProjectItemType, index) => {
						return (
							<ProjectItem
								key={project.name}
								project={project}
								num={index}
							/>
						);
					})}
			</div>
		</section>
	);
}

function ProjectItem({ project, num }: { project: ProjectItemType; num: number }) {
	return (
		<div>
			{project.preview && (
				<a href={project.url} rel="noreferrer" target="_blank" className="block">
					<Image
						src={project.preview}
						alt={project.name + " image"}
						width={800}
						height={600}
						className="w-full rounded-lg opacity-90 hover:opacity-100 transition-opacity shadow-lg shadow-black/5"
						quality={85}
					/>
				</a>
			)}
			<div className="mt-8 mx-6 lg:mx-24 relative">
				<h3>
					<a
						className="text-black dark:text-white hover:dark:text-white hover:text-black hover:underline hover:underline-offset-8"
						href={project.url}
						rel="noreferrer"
						target="_blank"
					>
						{project.name}
						<span className="ml-2 align-middle ic-xl ic-ne-arrow invert-[0.5]"></span>
					</a>
				</h3>
				<p
					className="my-6 text-gray-600 text-content text-project-description dark:text-gray-300 lg:text-base lg:leading-8"
					dangerouslySetInnerHTML={{ __html: project.description }}
				/>
				<div className="mt-10">
					{project.git ? (
						<a
							href={project.git}
							className={tail.project.btn}
							rel="noreferrer"
							target="_blank"
						>
							<span className="ic-md ic-github dark:invert mr-2 align-middle"></span>
							<span className="align-middle">GitHub</span>
						</a>
					) : (
						<></>
					)}
				</div>
				<div className="absolute font-mono italic -top-2 lg:-top-1 right-2 lg:-left-24 lg:right-auto text-5xl lg:text-7xl tracking-tighter text-stroke text-white dark:text-gray-950">
					#{num + 1}
				</div>
			</div>
		</div>
	);
}
