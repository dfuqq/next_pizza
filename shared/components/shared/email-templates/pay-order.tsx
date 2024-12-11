import React from 'react';

interface Props {
	orderId: number;
	totalCost: number;
	paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
	orderId,
	totalCost,
	paymentUrl,
}) => (
	<div>
		<h1>Заказ №{orderId}!</h1>

		<p>
			Оплатите заказ на сумму <b>{totalCost}₽</b>
		</p>
		<p>
			Перейдите{' '}
			<b>
				<a href={paymentUrl}>по этой ссылке</a>
			</b>
			для оплаты заказа
		</p>
	</div>
);
