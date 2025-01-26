import React from 'react';

import { FormInput, WhiteBlock } from '..';

interface Props {
	className?: string;
}

export const CheckoutContacts: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock
			title='2) Контакты'
			className={className}>
			<div className='grid grid-cols-2 gap-5'>
				<FormInput
					name='firstName'
					className='text-base'
					placeholder='Имя'
				/>
				<FormInput
					name='lastName'
					className='text-base'
					placeholder='Фамилия'
				/>
				<FormInput
					name='email'
					className='text-base'
					placeholder='E-Mail'
				/>
				<FormInput
					name='phone'
					className='text-base'
					placeholder='Номер телефона'
				/>
			</div>
		</WhiteBlock>
	);
};
