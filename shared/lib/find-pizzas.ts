import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	pizzaSizes?: string;
	pizzaDoughTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (
	searchParams: Promise<{ searchParams: GetSearchParams }>
) => {
	const params = (await searchParams) as GetSearchParams;

	const pizzaSizes = params.pizzaSizes?.split(',').map(Number);
	const pizzaDoughTypes = params.pizzaDoughTypes?.split(',').map(Number);
	const ingredientsIdArr = params.ingredients?.split(',').map(Number);

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
						  }
						: undefined,
					productVariants: {
						some: {
							size: {
								in: pizzaSizes,
							},
							pizzaDoughType: {
								in: pizzaDoughTypes,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					ingredients: true,
					productVariants: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	});

	return categories;
};
