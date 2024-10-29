import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title
					text='Пиццы'
					size='lg'
					className='font-extrabold'
				/>
			</Container>

			<TopBar />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[80px]'>
					{/* Filtration */}
					<div className='w-[250px]'>
						<Filters />
					</div>

					{/* List of Items */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList
								title='Пиццы'
								categoryId={1}
								products={[
									{
										id: 1,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 2,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 3,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 4,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 5,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
								]}
							/>

							<ProductsGroupList
								title='Комбо'
								categoryId={2}
								products={[
									{
										id: 1,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 2,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 3,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 4,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
									{
										id: 5,
										name: 'Чизбургер-пицца',
										variants: [{ price: 550 }],
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11EE7D61698827EE9B8DB6D0AEC53410.avif',
									},
								]}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
