'use client';

import React from 'react';
import { cn } from '@/shared/lib/';
import { useRouter } from 'next/navigation';

import { ExtendedProduct } from '@/@types/prisma';

import { Dialog, DialogContent } from '@/shared/components//';

import { ProductForm } from '..';

interface Props {
	product: ExtendedProduct;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}>
				<ProductForm
					product={product}
					onSubmit={() => router.back()}
				/>
			</DialogContent>
		</Dialog>
	);
};
