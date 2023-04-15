import * as React from "react";
import Topbar from "../Topbar";
import Hero from "./Hero";
import Squiggle from "../utils/Squiggle";
import Projects from "./Projects";

export default function Home() {
	return (
		<div className="fade-in-2 bg-white dark:bg-gray-950">
			<Topbar />
			<div className="py-8"></div>
			<Hero />
			<div className="container mx-auto">
				<Squiggle />
			</div>
			<Projects />
		</div>
	);
}
