import { PageProps } from '@/.next/types/app/(root)/page';
import {
	Container,
	Filters,
	ProductsGroupList,
	Stories,
	Title,
	TopBar,
} from '@/shared/components/';
import { findPizzas } from '@/shared/lib';
import { Suspense } from 'react';

// TODO: prebuild
export default async function Home({ searchParams }: PageProps) {
	const categories = await findPizzas(await searchParams);

	return (
		<>
			<Container className='mt-10'>
				<Title
					text='Пиццы'
					size='lg'
					className='font-extrabold'
				/>
			</Container>

			<Stories />

			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0
				)}
			/>

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[80px]'>
					{/* Filtration */}
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* List of Items */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											products={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
