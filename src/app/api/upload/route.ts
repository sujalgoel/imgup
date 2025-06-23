import { customAlphabet } from 'nanoid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const slugGenerator = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 9);

export async function POST(req: NextRequest) {
	const formData = await req.formData();

	const slug = slugGenerator();
	const file = formData.get('image') as File;

	if (!file) {
		return NextResponse.json(
			{ error: 'No file uploaded' },
			{ status: 400 },
		);
	}

	const fileBuffer = Buffer.from(await file.arrayBuffer());
	const fileName = `${Date.now()}-${file.name}`;

	const s3 = new S3Client({
		endpoint: process.env.R2_UPLOAD_DOMAIN!,
		region: 'auto',
		credentials: {
			accessKeyId: process.env.R2_ACCESS_KEY!,
			secretAccessKey: process.env.R2_SECRET_KEY!,
		},
	});

	try {
		await s3.send(
			new PutObjectCommand({
				Bucket: process.env.R2_BUCKET!,
				Key: fileName,
				Body: fileBuffer,
				ContentType: file.type || 'application/octet-stream',
			}),
		);

		const url = `${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;

		await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${slug}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
			},
			body: url,
		});

		return NextResponse.json({ slug });
	} catch (err) {
		console.error('Upload error:', err);
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
	}
}
