import React from 'react';
import { cn } from '@/lib/utils';
import { ProductCard, Title } from '.';

interface Props {
	title: string;
	products: any[];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	products,
	categoryId,
	className,
	listClassName,
}) => {
	return (
		<div className={className}>
			<Title
				text={title}
				size='lg'
				className='font-extrabold mb-5'
			/>

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{products.map((product, index) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.variants[0].price}
					/>
				))}
			</div>
		</div>
	);
};
