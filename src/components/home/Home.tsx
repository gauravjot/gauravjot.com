import * as React from "react";
import Topbar, { Page } from "../Topbar";
import Hero from "./Hero";
import Squiggle from "../utils/Squiggle";
import Projects from "./Projects";
import Footer from "../Footer";

export default function Home() {
	return (
		<div className="fade-in-2 bg-white dark:bg-gray-950">
			<Topbar current={Page.HOME} />
			<div className="py-8"></div>
			<Hero />
			<div className="container mx-auto">
				<Squiggle />
			</div>
			<Projects />
			<Footer />
		</div>
	);
}
