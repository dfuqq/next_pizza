import React from 'react';
import { cn } from '@/shared/lib/';

import { CountIconButton } from '.';

export interface CountButtonProps {
	quantity?: number;
	size?: 'sm' | 'lg';
	onClick?: (type: 'plus' | 'minus') => void;
	className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
	className,
	onClick,
	quantity = 1,
	size = 'sm',
}) => {
	return (
		<div
			className={cn(
				'inline-flex items-center justify-between gap-3',
				className
			)}>
			<CountIconButton
				onClick={() => onClick?.('minus')}
				disabled={quantity === 1}
				size={size}
				type='minus'
			/>

			<b className={size === 'sm' ? 'text-sm' : 'text-md'}>{quantity}</b>

			<CountIconButton
				onClick={() => onClick?.('plus')}
				size={size}
				type='plus'
			/>
		</div>
	);
};
