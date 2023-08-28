import { Metadata } from 'next';
import 'tailwindcss/tailwind.css';
import ParticlesComponent from '../../components/ParticlesComponent';
import DynamicImageComponent from '../../components/DynamicImageComponent';

interface Request {
	params: {
		slug: string;
	};
}

const isValidImage = async (pathname: string) => {
	const res = await fetch(`https://i.sujalgoel.me/${pathname}`, {
		cache: 'no-cache',
	});
	return res.status === 200;
};

export default function DynamicImagePage(
	request: Request,
): Promise<JSX.Element> {
	const pathname = request.params.slug;

	return (async () => {
		const isValid = await isValidImage(pathname);

		return (
			<div className='flex flex-col h-screen'>
				<ParticlesComponent className='absolute inset-0 -z-10' quantity={500} />

				<div className='flex-grow flex items-center justify-center'>
					<div className='w-1/3 max-sm:w-3/4 max-md:w-1/2 max-lg:w-1/2 max-xl:w-1/3'>
						<div className='p-5 rounded-lg border border-white'>
							{isValid ? (
								<DynamicImageComponent imagePath={pathname} />
							) : (
								<div className='text-center text-2xl text-white'>
									<span className='font-bold'>404</span> | Image not found
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	})();
}

export function generateMetadata({ params }: Request): Metadata {
	return {
		themeColor: '#000001',
		title: `${params.slug} | Imgup`,
		description:
			'Upload images and get a link to share them with your friends.',
		twitter: {
			card: 'summary_large_image',
			title: `${params.slug} | Imgup`,
		},
		openGraph: {
			type: 'website',
			locale: 'en_US',
			title: `${params.slug} | Imgup`,
			url: 'https://imgup.sujalgoel.me/',
			siteName: `${params.slug} | Imgup`,
			description:
				'Upload images and get a link to share them with your friends.',
			images: [
				{
					alt: `${params.slug} | Imgup`,
					url: `https://i.sujalgoel.me/${params.slug}`,
				},
			],
		},
		icons: {
			icon: ['/favicon.ico'],
			apple: ['/apple-touch-icon.png'],
			shortcut: ['/apple-touch-icon.png'],
		},
		manifest: './site.webmanifest',
	};
}
