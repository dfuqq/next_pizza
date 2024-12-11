import React from 'react';
import { CheckoutAddressInput, ErrorText, FormTextarea, WhiteBlock } from '..';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
	className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock
			title='3) Адрес'
			className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<CheckoutAddressInput onChange={field.onChange} />
							{/* NOTE: посмотреть flds, вроде не возвращает ошибку с формы */}
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					name='comment'
					rows={5}
					className='text-base'
					placeholder='Комментарий к заказу'
				/>
			</div>
		</WhiteBlock>
	);
};
