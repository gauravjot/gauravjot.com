import React from "react";

export function useLocalStorage<T>(key: string, fallbackValue: string) {
	const [value, setValue] = React.useState(fallbackValue);
	React.useEffect(() => {
		const stored = localStorage.getItem(key);
		setValue(stored ? stored : fallbackValue);
	}, [fallbackValue, key]);

	React.useEffect(() => {
		localStorage.setItem(key, value);
	}, [key, value]);

	return [value, setValue] as const;
}
