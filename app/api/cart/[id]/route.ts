import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalCost } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

// FIXME: PATCH срабатывает 200, но quantity не меняется
export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const data = (await req.json()) as { quantity: number };

		const token = req.cookies.get('cartToken')?.value;
		if (!token) {
			return NextResponse.json({ error: 'Cart Token Not Found!' });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart Item Not Found!' });
		}

		await prisma.cartItem.update({
			where: {
				id: Number(id),
			},
			data: {
				quantity: data.quantity,
			},
		});

		const updatedUserCart = await updateCartTotalCost(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log('[CART_PATCH] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ error: 'Cart Token Not Found!' });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart Item Not Found!' });
		}

		await prisma.cartItem.delete({
			where: {
				id: Number(id),
			},
		});

		const updatedUserCart = await updateCartTotalCost(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log('[CART_DELETE] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось удалить корзину' },
			{ status: 500 }
		);
	}
}
