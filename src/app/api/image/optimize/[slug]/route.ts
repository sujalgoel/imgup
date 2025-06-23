import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';

const getImageUrl: (slug: string) => Promise<string | null> = async (
	slug: string,
): Promise<string | null> => {
	try {
		const res: Response = await fetch(
			`https://imgup.sujalgoel.me/api/image/${slug}`,
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

const fetchImageBuffer = async (imageUrl: string): Promise<Buffer | null> => {
	try {
		const response = await fetch(imageUrl);
		if (!response.ok) return null;

		const arrayBuffer = await response.arrayBuffer();
		return Buffer.from(arrayBuffer);
	} catch (err) {
		console.error('Failed to fetch image buffer:', err);
		return null;
	}
};

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const { searchParams } = new URL(req.url);

	const width = parseInt(searchParams.get('w') || '1200');
	const height = parseInt(searchParams.get('h') || '630');
	const quality = parseInt(searchParams.get('q') || '75');

	try {
		const originalImageUrl = await getImageUrl(slug);

		if (!originalImageUrl) {
			return new Response('Image not found', { status: 404 });
		}

		const imageBuffer = await fetchImageBuffer(originalImageUrl);

		if (!imageBuffer) {
			return NextResponse.json(
				{ error: 'Failed to fetch image data' },
				{ status: 404 },
			);
		}

		const optimizedBuffer = await sharp(imageBuffer)
			.resize(width, height, {
				fit: 'inside',
				withoutEnlargement: true,
			})
			.jpeg({
				quality,
				progressive: true,
			})
			.toBuffer();

		return new NextResponse(optimizedBuffer, {
			headers: {
				'Content-Type': 'image/jpeg',
				'Cache-Control': 'public, max-age=31536000, immutable',
				'X-Optimized': 'true',
			},
		});
	} catch (err) {
		console.error('Image optimization failed:', err);
		return NextResponse.json(
			{ error: 'Optimization failed' },
			{ status: 500 },
		);
	}
}
