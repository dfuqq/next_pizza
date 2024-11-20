import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

import { getAvailablePizzaSizes } from '../lib';

import { ProductVariant } from '@prisma/client';

import { Variant } from '../components/shared/group-variants';
import { PizzaDoughType, PizzaSize } from '../consts/pizza';

interface ReturnProps {
	pizzaSize: PizzaSize;
	doughType: PizzaDoughType;
	selectedIngredients: Set<number>;
	availableSizes: Variant[];
	setPizzaSize: (pizzaSize: PizzaSize) => void;
	setDoughType: (doughType: PizzaDoughType) => void;
	addIngredient: (id: number) => void;
}

export const usePizzaVariants = (
	productVariants: ProductVariant[]
): ReturnProps => {
	const [pizzaSize, setPizzaSize] = useState<PizzaSize>(30);
	const [doughType, setDoughType] = useState<PizzaDoughType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);

	const availableSizes = getAvailablePizzaSizes(doughType, productVariants);

	useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			(size) => Number(size.value) === pizzaSize && !size.disabled
		);
		const availableSize = availableSizes.find((size) => !size.disabled);

		if (!isAvailableSize && availableSize)
			setPizzaSize(Number(availableSize.value) as PizzaSize);
	}, [doughType]);

	return {
		pizzaSize,
		doughType,
		selectedIngredients,
		availableSizes,
		setPizzaSize,
		setDoughType,
		addIngredient,
	};
};
