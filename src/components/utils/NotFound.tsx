import * as React from "react";
import { Helmet } from "react-helmet";

export function NotFound() {
	return (
		<section id="notfoundpage" className="bg-gray-950 text-white">
			<Helmet>
				<title>404 Not Found</title>
			</Helmet>
			<div className="container mx-auto">404, not found.</div>
		</section>
	);
}
