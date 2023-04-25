import { parseISO, format } from "date-fns";

export default function dateFormatter(dateString: string) {
	const date = parseISO(dateString);
	return format(date, "LLLL	d, yyyy");
}
