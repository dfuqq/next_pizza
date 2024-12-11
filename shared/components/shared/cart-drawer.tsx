'use client';

import React, { PropsWithChildren, useState } from 'react';
import { cn } from '@/shared/lib/';

import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaDoughType, PizzaSize } from '@/shared/consts/pizza';

import Image from 'next/image';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components//';
import Link from 'next/link';
import { Button } from '../ui';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { CartDrawerItem, Title } from '.';

export const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
	const { totalCost, items, updateItemQuantity, removeCartItem } = useCart();
	const [redirecting, setRedirecting] = useState(false);

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<div
					className={cn(
						'flex flex-col h-full',
						!totalCost && 'justify-between'
					)}>
					{totalCost > 0 && (
						<SheetHeader>
							<SheetTitle>
								Добавлено{' '}
								<span className='font-bold'>
									{items.length} товара
								</span>
							</SheetTitle>
						</SheetHeader>
					)}
					{!totalCost && (
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
							<Image
								src='/assets/images/empty-box.png'
								alt='Empty Cart'
								width={120}
								height={120}
							/>
							<Title
								size='sm'
								text='Корзина пустая'
								className='text-center font-bold my-2'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Ничего не добавлено...
							</p>

							{/* NOTE: SheetClose установлен asChild для невозможности вложенных кнопок */}
							<SheetClose asChild>
								<Button
									className='w-56 h-12 text-base group'
									size='lg'>
									<ArrowLeft className='w-5 mr-2 group-hover:animate-[side_1s_ease-in-out]' />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					)}
					{totalCost > 0 && (
						<>
							<div className='-mx-6 mt-5 overflow-auto flex-1'>
								{items.map((item) => (
									<div
										key={item.id}
										className='mb-2'>
										<CartDrawerItem
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
											onClickRemove={() =>
												removeCartItem(item.id)
											}
										/>
									</div>
								))}
							</div>

							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<div className='flex mb-4'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Итого
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</span>

										<span className='font-bold text-lg'>
											{totalCost}₽
										</span>
									</div>
									<Link href='/checkout'>
										<Button
											type='submit'
											loading={redirecting}
											className='w-full h-12 text-base'
											onClick={() =>
												setRedirecting(true)
											}>
											Оформить заказ
											<ArrowRight className='w-5 ml-2' />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
