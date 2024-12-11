import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

import { PaymentCallbackData } from '@/@types/yookassa';
import { OrderStatus } from '@prisma/client';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { SendEmail } from '@/shared/lib';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates/order-success';

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		});

		if (!order) {
			return NextResponse.json({ error: 'Order Not Found' });
		}

		const isSucceeded = body.object.status === 'succeeded';

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded
					? OrderStatus.SUCCEEDED
					: OrderStatus.CANCELED,
			},
		});

		const cartItems = JSON.parse(
			order?.orderList as string
		) as CartItemDTO[];

		if (isSucceeded) {
			await SendEmail(
				order.email,
				'Next Pizza | Ваш заказ успешно оформлен!',
				OrderSuccessTemplate({ orderId: order.id, cartItems })
			);
		}
		// TODO: Письмо с orderfailure
		// else {}
	} catch (error) {
		console.log('[Checkout Callback] Error:', error);
		return NextResponse.json({ error: 'Server Error' });
	}
}
