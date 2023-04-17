import * as React from "react";
import Head from "next/head";

export default function NotFound() {
	return (
		<section id="notfoundpage">
			<Head>
				<title>404 Not Found</title>
			</Head>
			<div className="container mx-auto">404, not found.</div>
		</section>
	);
}
