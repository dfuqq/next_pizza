import type { Metadata } from 'next';
import { Header } from '@/shared/components/';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
	description: 'Сайт компании Next Pizza по доставке еды.',
};

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header />
				{children}
				{modal}
			</Suspense>
		</main>
	);
}
