import React from 'react';

interface Props {
	verificationCode: string;
}

export const UserVerificationTemplate: React.FC<Props> = ({
	verificationCode,
}) => (
	<div>
		<h1>Вы пытались зарегистрироваться в Next Pizza</h1>

		<p>Получили Ваш запрос на регистрацию в Next Pizza.</p>
		<p>
			Введите код подтверждения <b>{verificationCode}</b> для
			подтверждения почты по ссылке ниже.
		</p>

		<p>
			<a
				href={`http://localhost:3000/api/auth/verify/?code=${verificationCode}`}>
				Подтвердить почту
			</a>
		</p>
	</div>
);
