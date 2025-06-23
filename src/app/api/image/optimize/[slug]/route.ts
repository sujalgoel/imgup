import sharp from 'sharp';

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

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } },
) {
	const { slug } = params;
	const { searchParams } = new URL(request.url);

	const width = parseInt(searchParams.get('w') || '1200');
	const height = parseInt(searchParams.get('h') || '630');
	const quality = parseInt(searchParams.get('q') || '75');

	try {
		// Get original image
		const originalImage = await getImageUrl(slug);

		if (!originalImage) {
			return new Response('Image not found', { status: 404 });
		}

		// Compress and resize
		const optimizedBuffer = await sharp(originalImage)
			.resize(width, height, {
				fit: 'inside',
				withoutEnlargement: true,
			})
			.jpeg({
				quality,
				progressive: true,
			})
			.toBuffer();

		return new Response(optimizedBuffer, {
			headers: {
				'Content-Type': 'image/jpeg',
				'Cache-Control': 'public, max-age=31536000, immutable',
			},
		});
	} catch (err) {
		console.error('Image optimization failed:', err);
		return new Response('Optimization failed', { status: 500 });
	}
}
