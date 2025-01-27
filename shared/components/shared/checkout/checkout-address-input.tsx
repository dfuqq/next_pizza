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
			// Fuck this token, not working with .env, stupid ass
			token='ce956b95519fb2b12bdc7f2722347ec727bd4dcf'
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
