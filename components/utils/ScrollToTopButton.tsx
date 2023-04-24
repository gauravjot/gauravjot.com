import * as React from "react";

export default function ScrollToTopBtn() {
	let mybutton = React.useRef<HTMLButtonElement>(null);

	// When the user scrolls down 20 units from the top of the document, show the button
	React.useEffect(() => {
		const handleScroll = () => {
			if (
				document.body.scrollTop > 200 ||
				document.documentElement.scrollTop > 200
			) {
				mybutton.current?.classList.remove("scale-0");
				mybutton.current?.classList.add("transition-transform");
				mybutton.current?.classList.add("scale-100");
			} else {
				mybutton.current?.classList.remove("scale-100");
				mybutton.current?.classList.add("scale-0");
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<button
			ref={mybutton}
			type="button"
			className="fixed scale-0 z-20 bottom-16 right-24 bg-gray-600/30 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-12 h-12"
			id="btn-back-to-top"
			title="Scroll to top"
			onClick={() => {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}}
			aria-label="Top"
		>
			&uarr;
		</button>
	);
}
