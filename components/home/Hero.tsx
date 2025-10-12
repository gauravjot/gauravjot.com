import * as React from "react";

export default function Hero() {
	const tail = {
		hero: {
			p: "text-content my-7 lg:leading-9 lg:text-[1.05rem] dark:text-gray-300",
		},
		social: {
			link: "w-10 h-10 flex place-content-center place-items-center hover:bg-gray-200/50 dark:hover:bg-gray-200/20 rounded",
			emailbtn: "btn-outline-light !py-3",
		},
	};

	return (
		<section id="hero">
			<div className="container mx-auto">
				<h1 className="my-10 lg:my-12 lg:mt-16 leading-[2.75rem] lg:leading-[4.25rem] text-content">
					Software Engineer & UI Designer,{" "}
					<span className="inline-block">
						Building Elegant & Reactive User Experiences.
					</span>
				</h1>
				<p className={tail.hero.p}>
					I am Gauravjot Garaya, a Vancouver based software engineer with over
					five years of experience. I specialize in translating web designs for
					the browser with focus on simplicity and accessibility.
				</p>
				<p className={tail.hero.p}>
					I am currently working as Full-Stack Developer at{" "}
					<a
						href="https://cascadeaerospace.com"
						rel="noreferrer"
						target="_blank"
					>
						Cascade Aerospace
					</a>{" "}
					and handle mission critical applications used by the hundreds of our
					highly skilled aerospace personnel.
				</p>
				<div className="flex gap-6 my-12 place-items-center">
					<a
						href="https://github.com/gauravjot"
						className={tail.social.link}
						rel="noreferrer"
						target="_blank"
						title="Github"
						aria-label="Github"
					>
						<span className="ic-md ic-github dark:invert-[.85]"></span>
					</a>
					<a
						href="https://linkedin.com/in/gauravjot"
						className={tail.social.link}
						rel="noreferrer"
						target="_blank"
						title="LinkedIn"
						aria-label="LinkedIn"
					>
						<span className="ic-md ic-linkedin dark:invert-[.85]"></span>
					</a>
					<a
						href="mailto:connect@gauravjot.com"
						className={tail.social.emailbtn}
						aria-label="Email me"
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
