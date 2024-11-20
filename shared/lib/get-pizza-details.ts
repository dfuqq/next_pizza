import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { ProductVariant, Ingredient } from '@prisma/client';
import { mapPizzaDoughType, PizzaDoughType, PizzaSize } from '../consts/pizza';

export const getPizzaDetails = (
	doughType: PizzaDoughType,
	pizzaSize: PizzaSize,
	productVariants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const textDetails = `${pizzaSize} см, ${mapPizzaDoughType[doughType]} тесто`;

	const totalPrice = calcTotalPizzaPrice(
		doughType,
		pizzaSize,
		productVariants,
		ingredients,
		selectedIngredients
	);

	return { textDetails, totalPrice };
};
