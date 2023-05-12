import * as React from "react";

export interface IPageProgressBarProps {}

export default function PageProgressBar(props: IPageProgressBarProps) {
	const [scrolled, setScrolled] = React.useState<number>(0);

	React.useEffect(() => {
		const handleScroll = () => {
			setScrolled(() => {
				let winheight =
					window.innerHeight ||
					(document.documentElement || document.body).clientHeight;
				let docheight = (): number => {
					return Math.max(
						document.body.scrollHeight,
						document.documentElement.scrollHeight,
						document.body.offsetHeight,
						document.documentElement.offsetHeight,
						document.body.clientHeight,
						document.documentElement.clientHeight
					);
				};
				let scrollTop =
					window.pageYOffset ||
					(
						document.documentElement ||
						document.body.parentNode ||
						document.body
					).scrollTop;
				let trackLength = docheight() - winheight;
				let pctScrolled = Math.floor((scrollTop / trackLength) * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
				return pctScrolled > 97 ? 100 : pctScrolled;
			});
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<div
				className="page-progress"
				style={{ backgroundSize: scrolled + "%" }}
			></div>
		</>
	);
}
