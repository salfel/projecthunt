import { useEffect, useState } from "react";

export function useSearchParam(key) {
	const [value, setValue] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		return params.get(key);
	});

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setValue(params.get(key));
	}, [key]);

	return value;
}
