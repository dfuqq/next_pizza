'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { useCartStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';

import { ExtendedProduct } from '@/@types/prisma';

import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
	product: ExtendedProduct;
	onSubmit?: VoidFunction;
	className?: string;
}

export const ProductForm: React.FC<Props> = ({
	product,
	onSubmit: _onSubmit,
}) => {
	const [addCartItem, loading] = useCartStore(
		useShallow((state) => [state.addCartItem, state.loading])
	);

	const onSubmit = async (
		productVariantId?: number,
		ingredients?: number[]
	) => {
		try {
			const variantId = productVariantId ?? firstVariant.id;

			await addCartItem({ productVariantId: variantId, ingredients });

			toast.success(`Добавили ${product.name} в корзину!`);
			_onSubmit?.();
		} catch (error) {
			toast.error('Не удалось добавить в корзину...');
			console.error(error);
		}
	};

	const firstVariant = product.productVariants[0];
	const isPizzaForm = Boolean(firstVariant.pizzaDoughType);

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				ingredients={product.ingredients}
				name={product.name}
				productVariants={product.productVariants}
				loading={loading}
				onSubmit={onSubmit}
			/>
		);
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			price={firstVariant.price}
			loading={loading}
			onSubmit={onSubmit}
		/>
	);
};
