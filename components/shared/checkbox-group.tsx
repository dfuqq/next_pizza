'use client';

import React, { useState } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	loading?: boolean;
	limit?: number;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	selectedValues?: Set<string>;
	className?: string;
	name?: string;
}

export const CheckboxGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	loading,
	searchInputPlaceholder = 'Поиск',
	className,
	onClickCheckbox,
	selectedValues,
	name,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const list = showAll
		? items.filter((item) =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: (defaultItems || items).slice(0, limit);

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	if (loading)
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>
				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton
							key={index}
							className='h-6 mb-4 rounded-[8px]'
						/>
					))}
				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		);

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{/* TODO: Анимация при раскрытии */}
			{showAll && (
				<div className='mb-5'>
					<Input
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
						onChange={onChangeSearchInput}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						checked={selectedValues?.has(item.value)}
						key={index}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div
					className={
						showAll ? 'border-t border-t-neutral-100 mt-4' : ''
					}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'>
						{showAll ? '- Скрыть' : '+ Больше'}
					</button>
				</div>
			)}
		</div>
	);
};
