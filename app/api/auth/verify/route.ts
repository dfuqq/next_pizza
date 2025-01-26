import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const verificationCode = req.nextUrl.searchParams.get('code');

		if (!verificationCode)
			return NextResponse.json(
				{ error: 'Invalid Code' },
				{ status: 400 }
			);

		const verificationCodeInPrisma =
			await prisma.verificationCode.findFirst({
				where: {
					code: verificationCode,
				},
			});

		if (!verificationCodeInPrisma)
			return NextResponse.json(
				{ error: 'Invalid Code' },
				{ status: 400 }
			);

		await prisma.user.update({
			where: {
				id: verificationCodeInPrisma.userId,
			},
			data: {
				verified: new Date(),
			},
		});

		await prisma.verificationCode.delete({
			where: {
				id: verificationCodeInPrisma.id,
			},
		});

		return NextResponse.redirect(new URL('/?verified', req.url));
	} catch (error) {
		console.log('[VERIFICATION_GET] Server Error', error);
	}
}
