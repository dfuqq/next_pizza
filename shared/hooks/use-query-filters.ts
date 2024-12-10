import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'qs';

import { FiltersProps } from './use-filters';

export const useQueryFilters = (filters: FiltersProps) => {
	const isMounted = useRef(false);
	const router = useRouter();

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				...filters.prices,
				pizzaDoughTypes: Array.from(filters.pizzaDoughTypes),
				sizes: Array.from(filters.sizes),
				ingredients: Array.from(filters.selectedIngredients),
			};

			const query = qs.stringify(params, {
				arrayFormat: 'comma',
			});

			router.push(`?${query}`, { scroll: false });
		}

		isMounted.current = true;
	}, [filters]);
};
