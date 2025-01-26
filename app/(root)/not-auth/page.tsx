import { InfoBlock } from '@/shared/components';

export default function UnauthorizedPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-40'>
			<InfoBlock
				title='Доступ запрещён'
				text='Эта страница доступна только после авторизации...'
				imageUrl='@/public/assets/images/lock.png'
				alt='Lock Image'
			/>
		</div>
	);
}
