'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCart } from '@/shared/hooks';

import {
	CheckoutAddress,
	CheckoutCart,
	CheckoutContacts,
	CheckoutPaymentBar,
	Container,
	Title,
} from '@/shared/components/';

import { checkoutFormSchema, CheckoutFormValues } from '@/shared/consts/';

export default function CheckoutPage() {
	const { totalCost, items, updateItemQuantity, removeCartItem, loading } =
		useCart();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	const onSubmit = (data: CheckoutFormValues) => {
		console.log(data);
	};

	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col flex-1 gap-10 mb-20'>
							<CheckoutCart
								loading={loading}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
							/>

							<CheckoutContacts
								className={
									loading
										? 'opacity-40 pointer-events-none'
										: ''
								}
							/>

							<CheckoutAddress
								className={
									loading
										? 'opacity-40 pointer-events-none'
										: ''
								}
							/>
						</div>

						<div className='w-[450px]'>
							<CheckoutPaymentBar
								totalCost={totalCost}
								loading={loading}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
