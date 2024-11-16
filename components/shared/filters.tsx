'use client';

import React from 'react';

import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

import { CheckboxGroup, Title } from '../shared';
import { Input, RangeSlider } from '../ui';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading } = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};

	const items = ingredients.map((item) => ({
		value: String(item.id),
		text: item.name,
	}));

	return (
		<div className={className}>
			<Title
				text='Фильтрация'
				size='sm'
				className='mb-5 font-bold'
			/>

			<CheckboxGroup
				title='Тип теста'
				name='pizzaDoughTypes'
				className='mb-5'
				onClickCheckbox={filters.setPizzaDoughTypes}
				selectedValues={filters.pizzaDoughTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>
			<CheckboxGroup
				title='Размеры'
				name='sizes'
				className='mb-5'
				onClickCheckbox={filters.setSizes}
				selectedValues={filters.sizes}
				items={[
					{ text: '25 см', value: '25' },
					{ text: '30 см', value: '30' },
					{ text: '35 см', value: '35' },
				]}
			/>

			{/* TODO: Сбрасывать стоимость по крестику */}
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) =>
							filters.setPrices(
								'priceFrom',
								Number(e.target.value)
							)
						}
					/>
					<Input
						type='number'
						placeholder='1000'
						min={100}
						max={1000}
						value={String(filters.prices.priceTo)}
						onChange={(e) =>
							filters.setPrices('priceTo', Number(e.target.value))
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 1000,
					]}
					onValueChange={updatePrices}
					className='cursor-pointer'
				/>
			</div>

			<CheckboxGroup
				title='Ингредиенты'
				name='ingredients'
				className='mt-5'
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
			/>
		</div>
	);
};
