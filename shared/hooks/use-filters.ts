import { useMemo, useState } from 'react';
import { useSet } from 'react-use';
import { useSearchParams } from 'next/navigation';

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFiltersProps extends PriceProps {
	pizzaDoughTypes: string;
	sizes: string;
	ingredients: string;
}

export interface FiltersProps {
	sizes: Set<string>;
	pizzaDoughTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
}

interface ReturnProps extends FiltersProps {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setPizzaDoughTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFiltersProps,
		string
	>;

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	);

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has('sizes')
				? searchParams.get('sizes')?.split(',')
				: []
		)
	);

	const [pizzaDoughTypes, { toggle: togglePizzaDoughTypes }] = useSet(
		new Set<string>(
			searchParams.has('pizzaDoughTypes')
				? searchParams.get('pizzaDoughTypes')?.split(',')
				: []
		)
	);

	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	const updatePrices = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return useMemo(
		() => ({
			selectedIngredients,
			sizes,
			pizzaDoughTypes,
			prices,
			setPrices: updatePrices,
			setPizzaDoughTypes: togglePizzaDoughTypes,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
		}),
		[selectedIngredients, sizes, pizzaDoughTypes, prices]
	);
};
