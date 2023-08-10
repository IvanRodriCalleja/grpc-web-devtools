import { useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

type UseDebounceSearchParams = {
	value: string;
	onChange: (newValue: string) => void;
};

export const useDebounceSearch = ({ onChange, value }: UseDebounceSearchParams) => {
	const [inputSearch, setSearch] = useState<string>(value);
	const debounceSearch = useDebouncedCallback(onChange, 500);

	const onSearchChange = (value: string) => {
		debounceSearch(value);
		setSearch(value);
	};

	return { onSearchChange, inputSearch };
};
