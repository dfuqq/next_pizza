'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';

import { ExtendedProduct } from '@/@types/prisma';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '..';

interface Props {
	product: ExtendedProduct;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	console.log(12123);
	const router = useRouter();
	const isPizzaForm = Boolean(product.productVariants[0].pizzaDoughType);

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
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
