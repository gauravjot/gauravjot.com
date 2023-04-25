import * as React from "react";
import Topbar, { Page } from "@/components/Topbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import ContactForm from "@/components/contact/Form";
import FindMe from "@/components/contact/FindMe";

export default function Home() {
	return (
		<div className="fade-in-2 bg-white dark:bg-gray-950">
			<Head>
				<title>Contact - Gauravjot Garaya</title>
			</Head>
			<Topbar current={Page.CONTACT} />
			<div className="py-10"></div>
			<div className="container mx-auto">
				<div className="mx-24 my-16">
					<ContactForm />
					<div className="py-8"></div>
					<FindMe />
				</div>
			</div>
			<Footer />
		</div>
	);
}