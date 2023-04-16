import React from "react";

export default function ThemeToggle() {
	let toggleBtn = React.useRef<HTMLButtonElement>(null);
	let darkMode = localStorage.getItem("darkMode");

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
			if (darkMode === ("enabled" || null)) {
				changeToDark();
			} else if (darkMode === "disabled") {
				changeToLight();
			}
		} else {
			if (darkMode === ("disabled" || null)) {
				changeToLight();
			} else if (darkMode === "enabled") {
				changeToDark();
			}
		}
	});

	// Detect browser's theme change
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (event) => {
			if (localStorage.getItem("darkMode") === null) {
				if (event.matches) {
					changeToDark();
				} else {
					changeToLight();
				}
			}
		});

	// Toggler
	const toggle = () => {
		let darkMode = localStorage.getItem("darkMode");
		if (darkMode !== "enabled") {
			localStorage.setItem("darkMode", "enabled");
			changeToDark();
		} else {
			localStorage.setItem("darkMode", "disabled");
			changeToLight();
		}
	};

	return (
		<div className="darkmode-toggle" onClick={toggle}>
			<button ref={toggleBtn}>
				<span className="ic ic-moon invert"></span>
				<span className="ic ic-sun invert"></span>
			</button>
		</div>
	);
}
