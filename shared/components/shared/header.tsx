'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/';

import { useSession, signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

import { Container, CartButton, SearchInput, ProfileButton } from '../shared';

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.has('paid')) {
			setTimeout(() => {
				toast.success('Заказ оплачен — детали на почте');
			}, 1000);
		}
	}, []);

	return (
		<header className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				{/* Left Side */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image
							src='/logo.png'
							alt='Logo'
							width={35}
							height={35}
						/>
						<div>
							<h1 className='text-2xl uppercase font-black'>
								Next Pizza
							</h1>
							<p className='text-sm text-gray-400 leading-3'>
								Вкуснее некуда
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				{/* Right Side */}
				<div className='flex items-center gap-3'>
					<ProfileButton />
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
