import "@/styles/globals.css";
import "@/styles/icons.css";
import "@/styles/spinner.css";
import "@/styles/syntax_highlight.css";
import "@/styles/blog.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
