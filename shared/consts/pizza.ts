export const mapPizzaSize = {
	25: 'Маленькая',
	30: 'Средняя',
	35: 'Большая',
} as const;

export const mapPizzaDoughType = {
	1: 'традиционное',
	2: 'тонкое',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value,
}));

export const PizzaDoughTypes = Object.entries(mapPizzaDoughType).map(
	([value, name]) => ({
		name,
		value,
	})
);

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaDoughType = keyof typeof mapPizzaDoughType;
