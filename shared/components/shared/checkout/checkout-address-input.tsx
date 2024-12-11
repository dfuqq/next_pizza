'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	onChange?: (value?: string) => void;
}

export const CheckoutAddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token='9bd9f8a95778570146fa0a26d268262846a92c8b'
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
