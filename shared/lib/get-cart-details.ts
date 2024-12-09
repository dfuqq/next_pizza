import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalCost } from './calc-cart-item-total-cost';

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
	pizzaDoughType?: number | null;
	addons: Array<{ name: string; price: number }>;
};

interface ReturnProps {
	items: CartStateItem[];
	totalCost: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.cartItems.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productVariant.product.name,
		imageUrl: item.productVariant.product.imageUrl,
		price: calcCartItemTotalCost(item),
		pizzaSize: item.productVariant.size,
		pizzaDoughType: item.productVariant.pizzaDoughType,
		addons: item.addons.map((addon) => ({
			name: addon.name,
			price: addon.price,
		})),
	})) as CartStateItem[];

	return {
		items,
		totalCost: data.totalCost,
	};
};
