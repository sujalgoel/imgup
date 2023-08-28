import './globals.css';
import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={montserrat.variable}>
			<body>{children}</body>
		</html>
	);
}

export function generateMetadata(): Metadata {
	return {
		themeColor: '#000001',
		title: `Imgup | Image Uploader`,
		description:
			'Upload images and get a link to share them with your friends.',
		twitter: {
			title: 'Imgup | Image Uploader',
			card: 'summary_large_image',
		},
		openGraph: {
			type: 'website',
			locale: 'en_US',
			title: 'Imgup | Image Uploader',
			url: 'https://imgup.sujalgoel.me/',
			siteName: 'Imgup | Image Uploader',
			description:
				'Upload images and get a link to share them with your friends.',
			images: [
				{
					width: 1200,
					height: 630,
					alt: 'Imgup | Image Uploader',
					url: 'https://i.imgur.com/tUCGiHW.png',
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
