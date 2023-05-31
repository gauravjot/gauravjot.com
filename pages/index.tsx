import * as React from "react";
import Topbar, { Page } from "@/components/Topbar";
import Hero from "@/components/home/Hero";
import Squiggle from "@/components/utils/Squiggle";
import Projects from "@/components/home/Projects";
import Footer from "@/components/Footer";
import Head from "next/head";
import ContactForm from "@/components/contact/Form";
import ScrollToTopBtn from "@/components/utils/ScrollToTopButton";

export default function Home() {
	let meta_description =
		"I am Gauravjot Garaya, a Vancouver based software engineer with over five years of experience. I specialize in translating web designs for the browser with focus on simplicity and usability.";

	return (
		<div className="fade-in-2 relative">
			<Head>
				<title>Gauravjot Garaya</title>
				<meta property="og:url" content={`https://gauravjot.com`} />
				<meta property="og:title" content="Gauravjot Garaya - Portfolio" />
				<meta property="og:description" content={meta_description} />
				<meta property="og:locale" content="en_US" />
				<meta name="description" content={meta_description} />
			</Head>
			<Topbar current={Page.HOME} />
			<div className="py-10"></div>
			<Hero />
			<div className="py-4"></div>
			<div className="container mx-auto">
				<Squiggle />
			</div>
			<div className="mt-12 mb-16 lg:mb-28">
				<Projects />
			</div>
			<div className="container mx-auto">
				<Squiggle />
				<div className="my-12 lg:my-24 mx-8 lg:mx-24">
					<ContactForm />
				</div>
			</div>
			<Footer />
			<ScrollToTopBtn />
		</div>
	);
}
