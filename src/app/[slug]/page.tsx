export const dynamic = 'force-dynamic';

import ParticlesComponent from '@/components/ParticlesComponent';
import DynamicImageComponent from '@/components/DynamicImageComponent';
import ImageActionButtonsComponent from '@/components/ImageActionButtonsComponent';

const getImageUrl: (slug: string) => Promise<string | null> = async (
	slug: string,
): Promise<string | null> => {
	try {
		const res: Response = await fetch(
			`http://localhost:3000/api/image/${slug}`,
			{
				cache: 'no-store',
			},
		);
		if (!res.ok) return null;

		const data = await res.json();

		return data.url as string;
	} catch (err) {
		console.error('Failed to fetch image:', err);
		return null;
	}
};

export default async function DynamicImagePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
	const { slug } = await params;
	const url = await getImageUrl(slug);

	return (
		<div className='flex! flex-col! h-screen! bg-gradient-to-tl! from-black! via-zinc-600/20! to-black!'>
			<ParticlesComponent
				className='absolute! inset-0! -z-10!'
				quantity={500}
			/>

			<div className='flex-grow! flex! items-center! justify-center!'>
				{url ? (
					<div className='w-11/12! sm:w-3/4! md:w-2/3! lg:w-1/2! xl:w-2/5! max-w-4xl!'>
						<div className='p-5! rounded-lg! border! border-white!'>
							<DynamicImageComponent imagePath={url} />
							<ImageActionButtonsComponent variant='image' />
						</div>
					</div>
				) : (
					<div className='text-center! w-full!'>
						<div className='flex! flex-col! items-center! justify-center!'>
							<div className='relative! w-full!'>
								<div className='text-8xl! md:text-9xl! font-black! text-transparent! bg-gradient-to-r! from-white! via-slate-500! to-white! bg-clip-text! animate-pulse!'>
									404
								</div>
								<div className='absolute! inset-0! text-8xl! md:text-9xl! font-black! text-white/40! blur-sm!'>
									404
								</div>
							</div>
							<ImageActionButtonsComponent variant='error' />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
