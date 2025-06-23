export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import ParticlesComponent from '@/components/ParticlesComponent';
import DynamicImageComponent from '@/components/DynamicImageComponent';
import ImageActionButtonsComponent from '@/components/ImageActionButtonsComponent';

const getImageUrl: (slug: string) => Promise<string | null> = async (
	slug: string,
): Promise<string | null> => {
	try {
		const res: Response = await fetch(
			`https://imgup.sujalgoel.me/api/image/${slug}`,
			// `http://localhost:3000/api/image/${slug}`,
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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const imageUrl = await getImageUrl(slug);

	const baseUrl = 'https://imgup.sujalgoel.me';
	const pageUrl = `${baseUrl}/${slug}`;

	if (!imageUrl) {
		return {
			title: 'Image Not Found | Imgup',
			description:
				'The requested image could not be found. Upload and share images instantly with Imgup.',
			openGraph: {
				title: 'Image Not Found | Imgup',
				description:
					'The requested image could not be found. Upload and share images instantly with Imgup.',
				url: pageUrl,
				siteName: 'Imgup',
				images: [
					{
						url: `${baseUrl}/thumbnail.jpg`,
						width: 1200,
						height: 630,
						alt: 'Imgup - Fast & Secure Image Uploader',
						type: 'image/jpeg',
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: 'Image Not Found | Imgup',
				description: 'The requested image could not be found.',
				images: [`${baseUrl}/thumbnail.jpg`],
			},
		};
	}

	const optimizedImageUrl = `${baseUrl}/api/image/optimize/${slug}?w=1200&h=630&q=75`;

	console.log('Optimized Image URL:', optimizedImageUrl);

	return {
		title: `Shared Image | Imgup`,
		description: `View and download this image shared via Imgup. Upload and share your own images instantly.`,
		openGraph: {
			type: 'website',
			url: pageUrl,
			siteName: 'Imgup',
			title: `Shared Image | Imgup`,
			description: `View and download this image shared via Imgup. Upload and share your own images instantly.`,
			images: [
				{
					url: optimizedImageUrl,
					width: 1200,
					height: 630,
					alt: `Image shared via Imgup - ${slug}`,
					type: 'image/jpeg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `Shared Image | Imgup`,
			description: `View and download this image shared via Imgup.`,
			images: [optimizedImageUrl],
		},
	};
}

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
