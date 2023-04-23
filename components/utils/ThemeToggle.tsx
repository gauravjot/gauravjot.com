import useLocalStorage from "@/hooks/useLocalStorage";
import React from "react";

export default function ThemeToggle() {
	let toggleBtn = React.useRef<HTMLButtonElement>(null);
	const [theme, setTheme] = useLocalStorage("theme", "light");

	// DOM inserts
	function changeToDark() {
		document.body.classList.add("dark");
		toggleBtn.current?.classList.add("enabled");
	}
	function changeToLight() {
		document.body.classList.remove("dark");
		toggleBtn.current?.classList.remove("enabled");
	}

	// Set default color accoriding to browser's theme
	React.useEffect(() => {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			if (theme === ("dark" || null)) {
				changeToDark();
			} else if (theme === "light") {
				changeToLight();
			}
		} else {
			if (theme === ("light" || null)) {
				changeToLight();
			} else if (theme === "dark") {
				changeToDark();
			}
		}

		// Detect browser's theme change
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (event) => {
				if (theme === null) {
					if (event.matches) {
						changeToDark();
					} else {
						changeToLight();
					}
				}
			});
	}, [theme]);

	// Toggler
	const toggle = () => {
		if (theme !== "dark") {
			setTheme("dark");
			changeToDark();
		} else {
			setTheme("light");
			changeToLight();
		}
	};

	return (
		<div className="darkmode-toggle" onClick={toggle}>
			<button ref={toggleBtn}>
				<span className="ic ic-moon invert"></span>
				<span className="ic ic-sun"></span>
			</button>
		</div>
	);
}
