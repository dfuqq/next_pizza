import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('query') || '';

	// FIXME: Локаль ломается в версел, поиск чувствительный, нужен костыль
	const products = await prisma.product.findMany({
		where: {
			OR: [
				{
					name: {
						contains:
							query[0].toLocaleLowerCase() +
							query.slice(1, query.length),
					},
				},
				{
					name: {
						contains:
							query[0].toLocaleUpperCase() +
							query.slice(1, query.length),
					},
				},
			],
		},
		take: 5,
	});

	return NextResponse.json(products);
}
