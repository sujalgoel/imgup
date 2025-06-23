import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;

	const res = await fetch(
		`${process.env.UPSTASH_REDIS_REST_URL}/get/${slug}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
			},
			cache: 'no-store',
		},
	);

	const url = await res.json();

	if (!res.ok || !url || url === 'null') {
		return NextResponse.json({ error: 'Image not found' }, { status: 404 });
	}

	return NextResponse.json({ url: url.result });
}
