'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from '.';
import { Button } from '../ui';

interface Props {
	name: string;
	imageUrl: string;
	price: number;
	loading?: boolean;
	onSubmit?: VoidFunction;
	className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
	name,
	imageUrl,
	price,
	loading,
	onSubmit,
	className,
}) => {
	return (
		<div className={cn('flex flex-1', className)}>
			<div className='flex items-center justify-center flex-1 relative w-full'>
				<img
					src={imageUrl}
					alt={name}
					className='relative left-2 top-2 transition-all z-10 w-[300px] h-[300px]'
				/>
			</div>

			<div className='w-[490px] bg-[#F7F6F5] p-7'>
				<Title
					text={name}
					size='md'
					className='font-extrabold mb-1'
				/>

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
					Добавить за {price}₽
				</Button>
			</div>
		</div>
	);
};
