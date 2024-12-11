import React from 'react';

import { CheckoutCartItem, CheckoutCartItemSkeleton, WhiteBlock } from '..';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaDoughType, PizzaSize } from '@/shared/consts/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
	items: CartStateItem[];
	loading?: boolean;
	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void;
	removeCartItem: (id: number) => void;
	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
	items,
	loading,
	onClickCountButton,
	removeCartItem,
	className,
}) => {
	return (
		<WhiteBlock
			title='1) Корзина'
			className={className}>
			<div className='flex flex-col gap-5'>
				{loading
					? [...Array(4)].map((_, index) => (
							<CheckoutCartItemSkeleton key={index} />
					  ))
					: items.map((item) => (
							<CheckoutCartItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.addons,
									item.pizzaDoughType as PizzaDoughType,
									item.pizzaSize as PizzaSize
								)}
								disabled={item.disabled}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								onClickCountButton={(type) =>
									onClickCountButton(
										item.id,
										item.quantity,
										type
									)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))}
			</div>
		</WhiteBlock>
	);
};
