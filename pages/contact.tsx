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
				<meta property="og:url" content={`https://gauravjot.com/contact`} />
				<meta property="og:title" content="Contact - Gauravjot Garaya" />
				<meta
					property="og:description"
					content="Please leave your message and I will get back. Thank you for reaching out!"
				/>
				<meta property="og:locale" content="en_US" />
			</Head>
			<Topbar current={Page.CONTACT} />
			<div className="py-10"></div>
			<div className="container mx-auto">
				<div className="md:mx-8 lg:mx-24 my-16">
					<ContactForm />
					<div className="py-8"></div>
					<FindMe />
				</div>
			</div>
			<Footer />
		</div>
	);
}
