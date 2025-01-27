import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

import { FindOrCreateCart, updateCartTotalCost } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ totalCost: 0, items: [] });
		}

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

		return NextResponse.json(userCart);
	} catch (error) {
		console.log('[CART_GET] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await FindOrCreateCart(token);

		const data = (await req.json()) as CreateCartItemValues;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productVariantId: data.productVariantId,
				// FIXME: увеличивать quantity одинаковых товаров при добавлении.
				// Баг призмы, every не может в строгое точное сравнение, костылить
				addons: { every: { id: { in: data.addons } }, some: {} },
			},
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			// FIXME: Добавленные допы не влияют на стоимость в корзине
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productVariantId: data.productVariantId,
					quantity: 1,
					addons: { connect: data.addons?.map((id) => ({ id })) },
				},
			});
		}

		const updatedUserCart = await updateCartTotalCost(token);

		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set('cartToken', token);
		return resp;
	} catch (error) {
		console.log('[CART_POST] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		);
	}
}
