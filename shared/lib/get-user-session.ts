import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/consts/auth-options';

export const getUserSession = async () => {
	const session = await getServerSession(authOptions);

	return session?.user ?? null;
};
