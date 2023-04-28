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
	return (
		<div className="fade-in-2 bg-white dark:bg-gray-950 relative">
			<Head>
				<title>Gauravjot Garaya</title>
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
