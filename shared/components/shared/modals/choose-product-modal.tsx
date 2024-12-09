'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';

import { ExtendedProduct } from '@/@types/prisma';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '..';
import { useCartStore } from '@/shared/store';

interface Props {
	product: ExtendedProduct;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstVariant = product.productVariants[0];
	const isPizzaForm = Boolean(firstVariant.pizzaDoughType);
	const addCartItem = useCartStore((state) => state.addCartItem);

	const onAddProduct = () => {
		addCartItem({
			productVariantId: firstVariant.id,
		});
	};

	const onAddPizza = (productVariantId: number, ingredients: number[]) => {
		addCartItem({
			productVariantId,
			ingredients,
		});
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
						onSubmit={onAddPizza}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						price={firstVariant.price}
						onSubmit={onAddProduct}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
