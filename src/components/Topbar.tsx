import * as React from "react";
import ThemeToggle from "./utils/theme_switch/ThemeToggle";
import { ReactComponent as Logo } from "../assets/svg/synth_logo.svg";

export enum Page {
	BLOG,
	PROJECTS,
	WORK,
	EDUCATION,
}

export default function Topbar({ current }: { current: Page }) {
	return (
		<div className="navbar-section z-40">
			<div className="navbar-background bg-white/50 dark:bg-gray-950/70 backdrop-blur-sm">
				<div className="container mx-auto">
					<nav className="flex">
						<div className="flex place-items-center">
							<a href="/">
								<Logo />
							</a>
						</div>
						<div className="flex-1 pb-3 pt-3.5 text-center">
							<a
								aria-current={current === Page.BLOG}
								className="nav-link"
								href="https://medium.com/@gauravjot"
								rel="noopener noreferrer"
								target="_blank"
							>
								Blog
							</a>
							<a
								aria-current={current === Page.PROJECTS}
								className="nav-link"
								href="#projects"
							>
								Projects
							</a>
							<a
								aria-current={current === Page.WORK}
								className="nav-link"
								href="#work"
							>
								Work
							</a>
							<a
								aria-current={current === Page.PROJECTS}
								className="nav-link"
								href="#education"
							>
								Education
							</a>
						</div>
						<div className="flex-none pb-3 pt-3.5">
							<div className="th-toggle">
								<ThemeToggle />
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
}
