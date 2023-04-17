import * as React from "react";
import ThemeToggle from "./utils/theme_switch/ThemeToggle";
import { ReactComponent as Logo } from "../assets/svg/synth_logo.svg";
import { ROUTE } from "../routes";

// navbar menu
export enum Page {
	HOME,
	BLOG,
	CONTACT,
}
const MENU = [
	{ id: Page.HOME, title: "Portfolio", url: ROUTE.home },
	{ id: Page.BLOG, title: "Blog", url: ROUTE.blog },
	{ id: Page.CONTACT, title: "Contact", url: ROUTE.contact },
];

export default function Topbar({ current }: { current: Page }) {
	return (
		<div className="navbar-section">
			<div className="navbar-background">
				<nav className="flex container mx-auto">
					<a className="flex place-items-center" href="/">
						<Logo />
					</a>
					<div className="flex-1 pb-3 pt-3.5 text-center">
						{MENU.map((menu) => {
							return (
								<a
									aria-current={current === menu.id}
									className="nav-link"
									href={menu.url}
								>
									{menu.title}
								</a>
							);
						})}
					</div>
					<div className="flex-none pb-3 pt-3.5 grid">
						<ThemeToggle />
					</div>
				</nav>
			</div>
		</div>
	);
}
