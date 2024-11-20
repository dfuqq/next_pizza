import { Ingredient, Product, ProductVariant } from '@prisma/client';

export type ExtendedProduct = Product & {
	productVariants: ProductVariant[];
	ingredients: Ingredient[];
};
