import {
	Cart,
	CartItem,
	Ingredient,
	Product,
	ProductVariant,
} from '@prisma/client';

export type CartItemDTO = CartItem & {
	productVariant: ProductVariant & {
		product: Product;
	};
	addons: Ingredient[];
};

export interface CartDTO extends Cart {
	cartItems: CartItemDTO[];
}

export interface CreateCartItemValues {
	productVariantId: number;
	addons?: number[];
	quantity: number;
}
