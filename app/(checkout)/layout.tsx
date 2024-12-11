import { Container, Header } from '@/shared/components/';

export const metadata = {
	title: 'Next Pizza | Корзина',
	description: 'Оплата добавленных товаров',
};

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='min-h-screen bg-[#F4F1EE]'>
			<Container>
				<Header
					hasSearch={false}
					hasCart={false}
					className='border-b-gray-200'
				/>

				{children}
			</Container>
		</main>
	);
}
