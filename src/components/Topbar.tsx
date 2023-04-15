import * as React from "react";
import ThemeToggle from "./utils/theme_switch/ThemeToggle";

export interface ITopbarProps {}

export default function Topbar(props: ITopbarProps) {
	return (
		<div className="navbar-section">
			<div className="navbar-background bg-white dark:bg-gray-950">
				<div className="container mx-auto">
					<nav className="flex pb-2 pt-3">
						<div className="flex-1">
							<a
								className="nav-link"
								href="https://medium.com/@gauravjot"
								rel="noopener noreferrer"
								target="_blank"
							>
								Blog
							</a>
							<a className="nav-link" href="#projects">
								Projects
							</a>
							<a className="nav-link" href="#work">
								Work
							</a>
							<a className="nav-link" href="#education">
								Education
							</a>
						</div>
						<div className="flex-none">
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
