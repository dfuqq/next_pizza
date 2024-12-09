import { Ingredient, ProductVariant } from '@prisma/client';
import { PizzaDoughType, PizzaSize } from '../consts/pizza';

/**
 * Функция для подсчёта общей стоимости пиццы
 * @param pizzaDoughType - тип теста выбранной пиццы
 * @param pizzaSize - размер выбранной пиццы
 * @param productVariants - список вариантов
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns ```number``` общая стоимость
 */
export const calcTotalPizzaPrice = (
	pizzaDoughType: PizzaDoughType,
	pizzaSize: PizzaSize,
	productVariants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	const pizzaVariantPrice =
		productVariants.find(
			(productVariant) =>
				productVariant.pizzaDoughType === pizzaDoughType &&
				productVariant.size === pizzaSize
		)?.price || 0;

	return totalIngredientsPrice + pizzaVariantPrice;
};
