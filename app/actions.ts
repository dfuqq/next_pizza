'use server';

import { prisma } from '@/prisma/prisma-client';

import { cookies } from 'next/headers';
import { createPayment, SendEmail } from '@/shared/lib';

import { CheckoutFormValues } from '@/shared/consts';
import { OrderStatus } from '@prisma/client';
import { PayOrderTemplate } from '@/shared/components';

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = (await cookieStore).get('cartToken')?.value;

		if (!cartToken) {
			throw new Error('Cart Token Not Found');
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				cartItems: {
					include: {
						addons: true,
						productVariant: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		if (!userCart) {
			throw new Error('Cart Not Found');
		}

		if (userCart?.totalCost === 0) {
			throw new Error('Cart is Empty');
		}

		// Создание заказа
		const order = await prisma.order.create({
			data: {
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalCost: userCart.totalCost,
				status: OrderStatus.PENDING,
				orderList: JSON.stringify(userCart.cartItems),
				token: cartToken,
			},
		});

		// Очищаем корзину
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalCost: 0,
			},
		});
		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		const paymentData = await createPayment({
			amount: order.totalCost,
			orderId: order.id,
			description: 'Оплата заказа №' + order.id,
		});

		if (!paymentData) {
			throw new Error('Payment Data Not Found');
		}

		// Присваиваем paymentId при создании платежа
		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		await SendEmail(
			data.email,
			'Next Pizza | Оплата заказа №' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalCost: order.totalCost,
				paymentUrl,
			})
		);

		return paymentUrl;
	} catch (error: any) {
		console.log('[CreateOrder] Server Error', error);
		console.log('Response', error.response.data);
	}
}
