import { Ingredient } from '@prisma/client';
import { mapPizzaDoughType, PizzaDoughType, PizzaSize } from '../consts/pizza';
import { CartStateItem } from './get-cart-details';

export const getCartItemDetails = (
	addons: CartStateItem['addons'],
	pizzaDoughType: PizzaDoughType,
	pizzaSize: PizzaSize
): string => {
	const details = [];

	if (pizzaSize && pizzaDoughType) {
		const pizzaDoughTypeName = mapPizzaDoughType[pizzaDoughType];
		details.push(`${pizzaSize} см, ${pizzaDoughTypeName}`);
	}

	if (addons) {
		details.push(...addons.map((addon) => addon.name));
	}

	return details.join(', ');
};
