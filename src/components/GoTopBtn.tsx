import * as React from "react";

export default function GoTopBtn() {
	let mybutton = React.useRef<HTMLButtonElement>(null);

	// When the user scrolls down 20 units from the top of the document, show the button
	React.useEffect(() => {
		const handleScroll = () => {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				mybutton.current?.classList.remove("hidden");
			} else {
				mybutton.current?.classList.add("hidden");
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
			className="btn btn-floating btn-lg fade-in-1"
			id="btn-back-to-top"
			onClick={() => {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}}
			aria-label="Top"
		>
			<i className="fas fa-arrow-up"></i>
		</button>
	);
}
