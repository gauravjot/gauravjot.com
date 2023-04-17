import * as React from "react";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
	return (
		<section id="notfoundpage">
			<Head>
				<title>404 Not Found</title>
			</Head>
			<div className="container mx-auto h-screen flex flex-col place-items-center place-content-center">
				<h1 className="text-center text-[5rem] mb-12 block">404</h1>
				<h3 className="my-2">{"Looks like you're lost"}</h3>
				<p className="!text-gray-400 dark:!text-gray-400">
					the page you have reached is not available :/
				</p>
				<Link
					href="/"
					className={
						"mt-12 inline-block bg-gradient-to-tr duration-500 from-cerise-500" +
						" dark:from-cerise-600 to-purpear-600 dark:to-purpear-700" +
						" transition-all !text-white hover:text-white hover:no-underline" +
						" px-8 py-3 font-sans font-medium rounded-full hover:shadow-xl" +
						" hover:shadow-cerise-300 hover:dark:shadow-cerise-900/90 hover:scale-105"
					}
				>
					Go to Home
				</Link>
				<div className="py-20"></div>
			</div>
		</section>
	);
}
