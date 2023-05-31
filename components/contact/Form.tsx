import React from "react";
import { useFormspark } from "@formspark/use-formspark";
import { Spinner } from "@/components/utils/Spinner";

const tail = {
	p: "mb-4 mt-8 dark:text-gray-300 text-gray-600",
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

interface FormErrorType {
	field: "from" | "message";
	message: string;
}

export default function ContactForm() {
	const [submit, submitting] = useFormspark({
		formId: "rhoniUCq",
	});
	const [from, setFrom] = React.useState<string | null>("");
	const [message, setMessage] = React.useState<string | null>("");
	const [error, setError] = React.useState<FormErrorType[] | null>(null);

	function validateEmail(addr: string) {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addr);
	}

	return (
		<>
			{message == null && from == null ? (
				<>
					<h2 className="leading-8">Thank you for reaching out!</h2>
					<p className={tail.p}>
						I usually respond back within 24 hours. Wish you a great day!
					</p>
				</>
			) : (
				<>
					<h2 className="leading-8">Let&rsquo;s work together!</h2>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							let errors: FormErrorType[] = [];
							if (!from || from.length < 1) {
								errors.push({
									field: "from",
									message:
										"I will need your email address to reach you.",
								});
							} else if (!validateEmail(from)) {
								errors.push({
									field: "from",
									message:
										"Seems like your email address is incorrect.",
								});
							}
							if (!message || message.length < 10) {
								errors.push({
									field: "message",
									message:
										"It seems your message is too small. Write atleast 10 characters.",
								});
							}
							if (errors.length > 0) {
								setError(errors);
								return;
							}
							setMessage(null);
							setFrom(null);
							setError(null);
							await submit({ from, message });
						}}
					>
						<p className={tail.p}>
							Tell me about your idea and I will get back to you. Thank you
							for reaching out!
						</p>
						<div className="py-1"></div>
						{error && error.length > 0 && !submitting ? (
							<div className="bg-cerise-100 dark:bg-cerise-700/10 dark:border dark:border-cerise-800/30 rounded px-4 py-2.5 mb-8">
								<h5 className="text-cerise-700 dark:text-white font-medium">
									Oh no!
								</h5>
								{error.map((err, index) => {
									return (
										<div
											className="tracking-tight pt-1 block"
											key={index}
										>
											<span className="text-purpear-600 dark:text-purpear-200 pr-3">
												{err.field === "from" ? "✉" : "✎"}
											</span>
											{err.message}
										</div>
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
				</>
			)}
		</>
	);
}
