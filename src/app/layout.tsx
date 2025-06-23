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
	const baseUrl = 'https://imgup.sujalgoel.me';
	const thumbnailUrl = `${baseUrl}/thumbnail.jpg`;

	return {
		metadataBase: new URL(baseUrl),
		title: {
			default: 'Imgup | Fast & Secure Image Uploader',
			template: '%s | Imgup',
		},
		description:
			'Upload and share images instantly with secure links. Fast, reliable and free image hosting service with direct sharing capabilities.',
		keywords: [
			'image upload',
			'image sharing',
			'image hosting',
			'share images',
			'upload pictures',
		],
		authors: [{ name: 'Sujal Goel', url: baseUrl }],
		creator: 'Sujal Goel',
		publisher: 'Imgup',
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
			},
		},
		alternates: {
			canonical: baseUrl,
		},
		openGraph: {
			type: 'website',
			locale: 'en_US',
			url: baseUrl,
			siteName: 'Imgup',
			title: 'Imgup | Fast & Secure Image Uploader',
			description:
				'Upload and share images instantly with secure links. Fast, reliable, and free image hosting service.',
			images: [
				{
					url: thumbnailUrl,
					width: 1200,
					height: 630,
					alt: 'Imgup - Fast & Secure Image Uploader',
					type: 'image/png',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Imgup | Fast & Secure Image Uploader',
			description:
				'Upload and share images instantly with secure links. Fast, reliable, and free image hosting service.',
			images: [thumbnailUrl],
			creator: '@sujalgoel',
		},
		icons: {
			icon: [
				{
					url: '/favicon-16x16.png',
					sizes: '16x16',
					type: 'image/png',
				},
				{
					url: '/favicon-32x32.png',
					sizes: '32x32',
					type: 'image/png',
				},
				{ url: '/favicon.ico', sizes: 'any' },
			],
			apple: [
				{
					url: '/apple-touch-icon.png',
					sizes: '180x180',
					type: 'image/png',
				},
			],
			shortcut: '/favicon.ico',
		},
		manifest: '/site.webmanifest',
		themeColor: [
			{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
			{ media: '(prefers-color-scheme: dark)', color: '#000001' },
		],
		viewport: {
			width: 'device-width',
			initialScale: 1,
			maximumScale: 1,
		},
		category: 'technology',
		classification: 'Image Hosting Service',
		referrer: 'origin-when-cross-origin',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		appleWebApp: {
			capable: true,
			title: 'Imgup',
			statusBarStyle: 'black-translucent',
		},
		other: {
			'mobile-web-app-capable': 'yes',
			'apple-mobile-web-app-capable': 'yes',
			'apple-mobile-web-app-status-bar-style': 'black-translucent',
		},
	};
}
