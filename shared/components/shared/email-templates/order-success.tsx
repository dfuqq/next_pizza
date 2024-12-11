import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
	orderId: number;
	cartItems: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({
	orderId,
	cartItems,
}) => (
	<div>
		<h1>Спасибо за заказ!</h1>

		<p>Ваш заказ №{orderId} успешно оплачен и уже готовится.</p>

		<p>
			Вот что мы готовим:
			<ul>
				{cartItems.map((cartItem) => (
					<li key={cartItem.id}>
						{cartItem.productVariant.product.name} |{' '}
						{cartItem.productVariant.price}₽ x {cartItem.quantity}{' '}
						шт. = {''}
						{cartItem.productVariant.price * cartItem.quantity}₽
					</li>
				))}
			</ul>
		</p>
	</div>
);
