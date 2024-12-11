import React from 'react';
import { cn } from '@/shared/lib/utils';

import { CheckoutCartItemDetails, WhiteBlock } from '..';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../../ui';

interface Props {
	totalCost: number;
	loading?: boolean;
	className?: string;
}

const VAT = 13;
const DELIVERY_PRICE = 100;

export const CheckoutPaymentBar: React.FC<Props> = ({
	totalCost,
	loading,
	className,
}) => {
	const vatPrice = (totalCost * VAT) / 100;
	const totalCheckoutPrice = totalCost + vatPrice + DELIVERY_PRICE;

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				{loading ? (
					<Skeleton className='h-11 w-48' />
				) : (
					<span className='h-11 text-[34px] font-extrabold'>
						{totalCheckoutPrice} ₽
					</span>
				)}
			</div>

			<CheckoutCartItemDetails
				title={
					<div className='flex items-center'>
						<Package
							size={18}
							className='mr-2 text-gray-400'
						/>
						'Стоимость корзины:'
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${totalCost}`
					)
				}
			/>
			<CheckoutCartItemDetails
				title={
					<div className='flex items-center'>
						<Percent
							size={18}
							className='mr-2 text-gray-400'
						/>
						'НДС:'
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${vatPrice}`
					)
				}
			/>
			<CheckoutCartItemDetails
				title={
					<div className='flex items-center'>
						<Truck
							size={18}
							className='mr-2 text-gray-400'
						/>
						'Доставка:'
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${DELIVERY_PRICE}`
					)
				}
			/>

			<Button
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold'>
				Перейти к оплате
				{/* TODO: Анимация стрелки */}
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</WhiteBlock>
	);
};
