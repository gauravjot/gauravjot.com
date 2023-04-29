import React from "react";
import { useFormspark } from "@formspark/use-formspark";
import { Spinner } from "@/components/utils/Spinner";

const tail = {
	p: "my-4 dark:text-gray-300 text-gray-600",
	form: {
		label: "mb-3 mt-6 block dark:text-gray-300 text-gray-600",
		text_input:
			"px-3 font-sans py-2 border border-gray-200 rounded-md" +
			" block w-full bg-white dark:bg-white/5 dark:border-white/10" +
			" focus-visible:outline-4 focus-visible:outline focus-visible:outline-skeal-400/20" +
			" focus-visible:border-skeal-400 focus-visible:dark:border-skeal-400",
		submit_btn: "btn-outline-light mt-2 !py-3 !px-5",
	},
};

export default function ContactForm() {
	const [submit, submitting] = useFormspark({
		formId: "rhoniUCq",
	});
	const [from, setFrom] = React.useState<string | null>("");
	const [message, setMessage] = React.useState<string | null>("");
	const [error, setError] = React.useState<string | null>(null);

	return (
		<>
			<h2 className="leading-8">I&rsquo;ll love to hear from you!</h2>
			{message == null && from == null ? (
				<p className={tail.p}>
					Thank you for reaching out. I usually respond back within 24 hours.
					Wish you a great day!
				</p>
			) : (
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						if (
							message !== null &&
							message.length > 0 &&
							from !== null &&
							from.length > 0
						) {
							await submit({ from, message });
							setMessage(null);
							setFrom(null);
						} else {
							setError("Something is missing in the form...");
						}
					}}
				>
					<p className={tail.p}>
						Please leave your message and I will get back. Thank you for
						reaching out!
					</p>
					<div className="py-1"></div>
					{error && !submitting ? (
						<div className="bg-cerise-100 dark:bg-cerise-700/10 dark:border dark:border-cerise-800/30 rounded px-4 py-2.5 mb-8">
							<h5 className="text-cerise-700 dark:text-white font-medium">
								Oh no!
							</h5>
							<span className="tracking-tight pt-1 block">
								<span className="text-purpear-600 dark:text-purpear-200">
									&#215;
								</span>{" "}
								{error}
							</span>
						</div>
					) : (
						<></>
					)}
					<label htmlFor="email" className={tail.form.label}>
						Your Email Address
					</label>
					<input
						id="email"
						type="email"
						name="email"
						className={tail.form.text_input}
						value={from ? from : ""}
						onChange={(e) => setFrom(e.target.value)}
					/>
					<label htmlFor="message" className={tail.form.label}>
						Message
					</label>
					<textarea
						id="message"
						name="message"
						rows={5}
						className={tail.form.text_input}
						value={message ? message : ""}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<div className="mt-6">
						{submitting ? (
							<div className="align-middle leading-4">
								<Spinner />
							</div>
						) : (
							<button
								type="submit"
								className={tail.form.submit_btn}
								disabled={submitting}
							>
								<span className="ic ic-send align-top dark:invert"></span>
								<span className="align-top ml-2">Submit</span>
							</button>
						)}
					</div>
				</form>
			)}
		</>
	);
}
