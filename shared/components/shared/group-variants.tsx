'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
	variants: readonly Variant[];
	onClick?: (value: Variant['value']) => void;
	selectedValue?: Variant['value'];
	className?: string;
}

export type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};

export const GroupVariants: React.FC<Props> = ({
	variants,
	onClick,
	selectedValue,
	className,
}) => {
	return (
		<div
			className={cn(
				'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
				className
			)}>
			{variants.map((variant) => (
				<button
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': variant.value === selectedValue,
							'text-gray-500 opacity-50 pointer-events-none':
								variant.disabled,
						}
					)}
					key={variant.name}
					onClick={() => onClick?.(variant.value)}>
					{variant.name}
				</button>
			))}
		</div>
	);
};
