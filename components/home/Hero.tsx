import * as React from "react";

export default function Hero() {
	const tail = {
		hero: {
			p: "text-content my-7 leading-9 text-[1.05rem] dark:text-gray-300",
		},
		social: {
			link: "w-10 h-10 flex place-content-center place-items-center hover:bg-gray-200/50 dark:hover:bg-gray-200/20 rounded",
			emailbtn: "btn-outline-light !py-3",
		},
	};

	return (
		<section id="hero">
			<div className="container mx-auto">
				<h1 className="my-12 mt-16 leading-[4.25rem] text-content">
					Software Engineer, Front-End
					<br /> Developer and Open Source
					<br /> Contributor
				</h1>
				<p className={tail.hero.p}>
					I am Gauravjot Garaya, a Vancouver based software engineer with over
					five years of experience. I specialize in translating web designs for
					the browser with focus on simplicity and usability.
				</p>
				<p className={tail.hero.p}>
					I am currently working on{" "}
					<a href="https://cofinder.ca" rel="noreferrer" target="_blank">
						CoFinder.ca
					</a>{" "}
					where I am in charge of developing the front-end. CoFinder is used by
					students and instructors at{" "}
					<a href="https://ufv.ca" rel="noreferrer" target="_blank">
						University of the Fraser Vallery
					</a>
					.
				</p>
				<p className={tail.hero.p}>
					Alongwith, I also like to tinker with open-source projects built with
					ReactJS and induldge in assisting fellow developers when it comes to
					design principles and best practices for UI.
				</p>
				<div role="social-links" className="flex gap-6 my-12 place-items-center">
					<a
						href="https://github.com/gauravjot"
						className={tail.social.link}
						rel="noreferrer"
						target="_blank"
						title="Github"
					>
						<span className="ic-md ic-github dark:invert-[.85]"></span>
					</a>
					<a
						href="https://linkedin.com/in/gauravjot"
						className={tail.social.link}
						rel="noreferrer"
						target="_blank"
						title="LinkedIn"
					>
						<span className="ic-md ic-linkedin dark:invert-[.85]"></span>
					</a>
					<a
						href="mailto:connect@gauravjot.com"
						className={tail.social.emailbtn}
					>
						<span className="ic align-top ic-email dark:invert"></span>
						<span className="align-top ml-2.5 text-black dark:text-white">
							Email me
						</span>
					</a>
				</div>
			</div>
		</section>
	);
}
