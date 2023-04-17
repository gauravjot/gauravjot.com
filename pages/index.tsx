import * as React from "react";
import Topbar, { Page } from "../components/Topbar";
import Hero from "../components/home/Hero";
import Squiggle from "../components/utils/Squiggle";
import Projects from "../components/home/Projects";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Home() {
	return (
		<div className="fade-in-2 bg-white dark:bg-gray-950">
			<Head>
				<title>Gauravjot Garaya</title>
			</Head>
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
