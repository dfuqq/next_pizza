import { redirect } from 'next/navigation';
// getUserSession при @/shared/lib ломает проект, потому что
// работает на уровне браузера
import { getUserSession } from '@/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components';

export default async function ProfilePage() {
	const session = await getUserSession();

	if (!session) {
		return redirect('/not-auth');
	}

	const user = await prisma.user.findFirst({
		where: { id: Number(session?.id) },
	});

	if (!user) {
		return redirect('/not-auth');
	}

	return <ProfileForm data={user} />;
}
