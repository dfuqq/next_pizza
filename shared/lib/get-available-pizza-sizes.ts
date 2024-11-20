import { ProductVariant } from '@prisma/client';
import { PizzaDoughType, pizzaSizes } from '../consts/pizza';
import { Variant } from '../components/shared/group-variants';

export const getAvailablePizzaSizes = (
	doughType: PizzaDoughType,
	productVariants: ProductVariant[]
): Variant[] => {
	return pizzaSizes.map((size) => ({
		name: size.name,
		value: size.value,
		disabled: !productVariants
			.filter(
				(productVariant) => productVariant.pizzaDoughType === doughType
			)
			.some((pizza) => Number(pizza.size) === Number(size.value)),
	}));
};
