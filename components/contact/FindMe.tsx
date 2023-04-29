import * as React from "react";

const socials = [
	{
		name: "Email",
		url: "mailto:connect@gauravjot.com",
		shorturl: "connect@gauravjot.com",
		ic: "ic-email",
	},
	{
		name: "LinkedIn",
		url: "https://linkedin.com/in/gauravjot",
		shorturl: "linkedin.com/in/gauravjot",
		ic: "ic-linkedin",
	},
	{
		name: "GitHub",
		url: "https://github.com/gauravjot",
		shorturl: "github.com/gauravjot",
		ic: "ic-github",
	},
];

export default function FindMe() {
	return (
		<div>
			<h3 className="mb-6">Or find me here</h3>
			{socials.map((social) => {
				return (
					<div className="py-1.5" key={social.name}>
						<span
							className={
								social.ic + " ic dark:invert-[0.8] align-middle mr-4"
							}
						></span>
						<a
							href={social.url}
							title={social.name}
							rel="noreferrer"
							target="_blank"
							className="hover:underline align-middle hover:underline-offset-4"
						>
							{social.shorturl}
							<span className="ic ic-ne-arrow invert-[0.75] dark:invert-[0.25] align-middle ml-1"></span>
						</a>
					</div>
				);
			})}
		</div>
	);
}
