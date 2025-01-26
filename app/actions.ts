'use server';

import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { hashSync } from 'bcrypt';

import { createPayment, SendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';

import { CheckoutFormValues } from '@/shared/consts';
import {
	PayOrderTemplate,
	UserVerificationTemplate,
} from '@/shared/components';

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

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) throw new Error('User Not Found');

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		});
	} catch (error) {
		console.log('Error [UPDATE_USER]', error);
		throw error;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error('Почта не подтверждена');
			}

			throw new Error('Пользователь уже существует');
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		});

		const verificationCode = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		await prisma.verificationCode.create({
			data: {
				code: verificationCode,
				userId: createdUser.id,
			},
		});

		await SendEmail(
			createdUser.email,
			'Next Pizza | Подтверждение регистрации',
			UserVerificationTemplate({
				verificationCode,
			})
		);
	} catch (error) {
		console.log('Error [CREATE_USER]', error);
		throw error;
	}
}
