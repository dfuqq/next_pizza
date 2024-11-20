import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

import { ChooseProductModal } from '@/shared/components/shared/modals/';

export default async function ProductModalPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			productVariants: true,
		},
	});

	if (!product) return notFound();

	return <ChooseProductModal product={product} />;
}
