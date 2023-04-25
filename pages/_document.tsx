import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="manifest" href="/site.webmanifest" />
			</Head>
			<body>
				<Script id="themeSet" strategy="afterInteractive">
					{`if(!document.body.classList.contains("dark") && localStorage.getItem("theme") === 'dark'){document.body.classList.add("dark");}`}
				</Script>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
