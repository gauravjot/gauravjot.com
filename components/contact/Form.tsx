import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Spinner } from "@/components/utils/Spinner";

const tail = {
	p: "my-4 dark:text-gray-300 text-gray-600",
	form: {
		label: "mb-3 mt-6 block dark:text-gray-300 text-gray-600",
		text_input:
			"px-3 font-sans py-2 border border-gray-200 rounded-md block w-full bg-white dark:bg-white/5 dark:border-white/10" +
			" focus-visible:outline-4 focus-visible:outline focus-visible:outline-skeal-400/20 focus-visible:border-skeal-400 focus-visible:dark:border-skeal-400",
		submit_btn: "btn-outline-light mt-2 !py-3 !px-5",
	},
};

export default function ContactForm() {
	const [state, handleSubmit] = useForm("xeqwvrlb");

	return (
		<>
			<h2>I&rsquo;ll love to hear from you!</h2>
			{state.succeeded ? (
				<p className={tail.p}>
					Thank you for reaching out. I usually respond back within 24 hours.
					Wish you a great day!
				</p>
			) : (
				<form onSubmit={handleSubmit}>
					<p className={tail.p}>
						Please leave your message and I will get back. Thank you for
						reaching out!
					</p>
					<div className="py-1"></div>
					{state.errors && state.errors.length > 0 && !state.submitting ? (
						<div className="bg-cerise-100 dark:bg-cerise-700/10 dark:border dark:border-cerise-800/30 rounded px-4 py-2.5 mb-8">
							<h5 className="text-cerise-700 dark:text-white font-medium">
								Oh no!
							</h5>
							{state.errors.map((err) => {
								return (
									<span
										key={err.code}
										className="tracking-tight pt-1 block"
									>
										<span className="text-purpear-600 dark:text-purpear-200">
											&#215;
										</span>{" "}
										{err.message}
									</span>
								);
							})}
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
					/>
					<ValidationError prefix="Email" field="email" errors={state.errors} />
					<label htmlFor="message" className={tail.form.label}>
						Message
					</label>
					<textarea
						id="message"
						name="message"
						rows={5}
						className={tail.form.text_input}
					/>
					<ValidationError
						prefix="Message"
						field="message"
						errors={state.errors}
					/>
					<div className="mt-6">
						{state.submitting ? (
							<div className="align-middle leading-4">
								<Spinner />
							</div>
						) : (
							<button
								type="submit"
								className={tail.form.submit_btn}
								disabled={state.submitting}
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
