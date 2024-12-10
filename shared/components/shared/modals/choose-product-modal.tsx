'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import { ExtendedProduct } from '@/@types/prisma';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '..';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
	product: ExtendedProduct;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstVariant = product.productVariants[0];
	const isPizzaForm = Boolean(firstVariant.pizzaDoughType);
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
			router.back();
		} catch (error) {
			toast.error('Не удалось добавить в корзину...');
			console.error(error);
		}
	};

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
						name={product.name}
						productVariants={product.productVariants}
						loading={loading}
						onSubmit={onSubmit}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						price={firstVariant.price}
						loading={loading}
						onSubmit={onSubmit}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
