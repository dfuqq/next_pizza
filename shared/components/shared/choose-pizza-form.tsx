'use client';

import React from 'react';
import { cn } from '@/shared/lib/';

import { usePizzaVariants } from '@/shared/hooks';
import { getPizzaDetails } from '@/shared/lib';

import { Ingredient, ProductVariant } from '@prisma/client';

import {
	PizzaDoughType,
	PizzaDoughTypes,
	PizzaSize,
} from '@/shared/consts/pizza';

import { GroupVariants, IngredientItem, Title } from '.';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';

interface Props {
	name: string;
	ingredients: Ingredient[];
	productVariants: ProductVariant[];
	imageUrl: string;
	loading?: boolean;
	onSubmit: (variantId: number, ingredients: number[]) => void;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	ingredients,
	productVariants,
	imageUrl,
	loading,
	onSubmit,
	className,
}) => {
	const {
		pizzaSize,
		doughType,
		selectedIngredients,
		availableSizes,
		currentVariantId,
		addIngredient,
		setPizzaSize,
		setDoughType,
	} = usePizzaVariants(productVariants);

	const { textDetails, totalPrice } = getPizzaDetails(
		doughType,
		pizzaSize,
		productVariants,
		ingredients,
		selectedIngredients
	);

	const handleClickAddToCart = () => {
		if (currentVariantId) {
			onSubmit(currentVariantId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn('flex flex-1', className)}>
			<PizzaImage
				imageUrl={imageUrl}
				size={30}
			/>

			<div className='w-[490px] bg-[#F7F6F5] p-7'>
				<Title
					text={name}
					size='md'
					className='font-extrabold mb-1'
				/>

				<p className='text-gray-400'>{textDetails}</p>

				<div className='flex flex-col gap-4 mt-5'>
					<GroupVariants
						variants={availableSizes}
						selectedValue={String(pizzaSize)}
						onClick={(value) =>
							setPizzaSize(Number(value) as PizzaSize)
						}
					/>
					<GroupVariants
						variants={PizzaDoughTypes}
						selectedValue={String(doughType)}
						onClick={(value) =>
							setDoughType(Number(value) as PizzaDoughType)
						}
					/>
				</div>

				<div className='bg-gray-50 p-5 mt-5 rounded-md h-[420px] overflow-auto scrollbar'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								name={ingredient.name}
								imageUrl={ingredient.imageUrl}
								price={ingredient.price}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAddToCart}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
					Добавить за {totalPrice}₽
				</Button>
			</div>
		</div>
	);
};
