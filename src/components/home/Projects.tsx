import * as React from "react";
import axios from "axios";

interface ProjectItemType {
	description: string;
	github?: string;
	name: string;
	started?: string;
	finished?: string;
	type?: string;
	skills?: string;
	lang?: string;
	art?: string;
	gallery?: string;
}

export default function Projects() {
	const [projects, setProjects] = React.useState<ProjectItemType[]>([]);

	React.useEffect(() => {
		axios
			.get("https://gauravjot-portfolio.firebaseio.com/projects.json")
			.then(({ data }) => {
				let projectsArray: ProjectItemType[] = [];
				const projectsInJSON = data.projects.split(","); // project1, project2 ...
				projectsInJSON.forEach((e: string) => {
					projectsArray[projectsArray.length] = data[e];
				});
				setProjects(projectsArray);
				console.log(projectsArray);
			});
	}, []);

	return (
		<section id="projects" className="container mx-auto">
			<h2 className="my-4">Projects</h2>
			{projects?.length > 0 &&
				projects.map((project) => {
					return <ProjectItem key={project.name} project={project} />;
				})}
		</section>
	);
}

function ProjectItem({ project }: { project: ProjectItemType }) {
	return (
		<div className="flex my-8">
			<div className="w-3/5 mr-8">
				<h3>{project.name}</h3>
				<div className="my-0.5">
					{project.lang && project.lang + " / "}
					{project.skills && project.skills}
				</div>
				<p className="my-2.5 text-gray-700 dark:text-gray-300">
					{project.description}
				</p>
				<div className="my-4">
					<a
						href={project.github}
						className="btn-outline-light"
						rel="noreferrer"
						target="_blank"
					>
						<span className="ic-md ic-github dark:invert mr-2 align-middle"></span>
						<span className="align-middle">GitHub</span>
					</a>
				</div>
			</div>
			<div className="w-2/5">
				{project.art && <img src={project.art} alt={project.name + " image"} />}
			</div>
		</div>
	);
}
