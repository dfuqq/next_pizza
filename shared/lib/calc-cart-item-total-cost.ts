import { CartItemDTO } from '../services/dto/cart.dto';

/**
 * Функция для подсчёта общей стоимости товара в корзине
 * @param item товар корзины типа CartItemDTO (вывод API)
 * @returns ```number``` общая стоимость
 */
export const calcCartItemTotalCost = (item: CartItemDTO): number => {
	const addonsPrice = item.addons.reduce(
		(acc, addon) => acc + addon.price,
		0
	);

	return (addonsPrice + item.productVariant.price) * item.quantity;
};
