import { prisma } from '@/prisma/prisma-client';
import { calcCartItemTotalCost } from './calc-cart-item-total-cost';

/**
 * Функция находит корзину пользователя, вычисляет общую стоимость из отдельных товаров,
 * записывает её и возвращает обновлённую корзину
 * @param token токен авторизованного пользователя, по которому происходит поиск корзины
 * @returns ```object``` для API
 */
export const updateCartTotalCost = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			cartItems: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productVariant: {
						include: {
							product: true,
						},
					},
					addons: true,
				},
			},
		},
	});

	if (!userCart) return;

	const totalCost = userCart?.cartItems.reduce((acc, cartItem) => {
		return acc + calcCartItemTotalCost(cartItem);
	}, 0);

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalCost,
		},
		include: {
			cartItems: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productVariant: {
						include: {
							product: true,
						},
					},
					addons: true,
				},
			},
		},
	});
};
