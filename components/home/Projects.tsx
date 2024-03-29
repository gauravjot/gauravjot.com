/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import data from "@/json/projects.json";
import Image from "next/image";

type ProjectItemType = {
	name: string;
	description: string;
	preview: string;
	url?: string;
	git?: string;
	video?: string;
};

const tail = {
	project: {
		link: "w-10 h-10 flex place-content-center place-items-center hover:bg-gray-200/50 dark:hover:bg-gray-200/20 rounded",
		btn: "btn-outline-light !py-2.5",
		secondaryBtn:
			"py-2 mx-6 rounded-full dark:text-white hover:dark:text-white hover:underline underline-offset-[0.5rem]",
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

function ProjectItem(props: { project: ProjectItemType; num: number }) {
	return (
		<div>
			{props.project.url ? (
				<a
					href={props.project.url}
					rel="noreferrer"
					target="_blank"
					className="block aspect-[2000/1169] relative"
				>
					<PreviewImage project={props.project} />
				</a>
			) : (
				<div className="aspect-[2000/1169] relative">
					<PreviewImage project={props.project} />
				</div>
			)}
			<div className="mt-8 mx-6 lg:mx-24 relative">
				<h3>
					{props.project.url ? (
						<a
							className="text-black dark:text-white hover:dark:text-white hover:text-black hover:underline hover:underline-offset-8"
							href={props.project.url}
							rel="noreferrer"
							target="_blank"
						>
							{props.project.name}
							<span className="ml-2 align-middle ic-xl ic-ne-arrow invert-[0.5]"></span>
						</a>
					) : (
						<>{props.project.name}</>
					)}
				</h3>
				<div
					className="my-6 text-gray-600 text-content text-project-description dark:text-gray-300 lg:text-base lg:leading-8"
					dangerouslySetInnerHTML={{ __html: props.project.description }}
				/>
				<div className="mt-10">
					{props.project.git ? (
						<a
							href={props.project.git}
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
					{props.project.video ? (
						<a
							href={props.project.video}
							className={tail.project.secondaryBtn}
							rel="noreferrer"
							target="_blank"
						>
							<span className="ic-md ic-video-play dark:invert mr-3 align-middle"></span>
							<span className="align-middle">Watch Demo Video</span>
						</a>
					) : (
						<></>
					)}
				</div>
				{/* <div className="absolute font-mono italic -top-2 lg:-top-1 right-2 lg:-left-24 lg:right-auto text-5xl lg:text-7xl tracking-tighter text-stroke text-white dark:text-gray-1000">
					#{props.num + 1}
				</div> */}
			</div>
		</div>
	);
}

function PreviewImage(props: { project: ProjectItemType }) {
	return (
		<Image
			src={props.project.preview}
			fill={true}
			loading="lazy"
			alt={props.project.name + " image"}
			className="w-full rounded-lg opacity-90 hover:opacity-100 transition-opacity shadow-lg shadow-black/5"
		/>
	);
}
