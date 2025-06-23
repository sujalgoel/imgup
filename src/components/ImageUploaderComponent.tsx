'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useRef, ChangeEvent } from 'react';

import 'react-toastify/dist/ReactToastify.css';

interface ImageUploaderProps {
	triggerForm: boolean;
}

const ImageUploaderComponent: FC<ImageUploaderProps> = ({ triggerForm }) => {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (triggerForm) {
			fileInputRef.current?.click();
		}
	}, [triggerForm]);

	const uploadToR2 = async (file: File): Promise<string> => {
		const formData = new FormData();
		formData.append('image', file);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		const data = await res.json();
		if (!res.ok) throw new Error(data.error || 'Upload failed');
		return data.slug;
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.target.files || !e.target.files[0]) return;

		const file = e.target.files[0];
		const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
		if (!file.type.match(fileTypes.join('|'))) {
			toast.error('Only PNG, JPEG, and JPG files are allowed!', {
				theme: 'dark',
			});
			return e.target.form?.reset();
		}

		try {
			const imageUrl = await uploadToR2(file);
			toast.success('Image uploaded successfully!', { theme: 'dark' });
			router.push(`/${imageUrl}`);
		} catch (err) {
			console.error(err);
			toast.error('Upload failed. Please try again later.', {
				theme: 'dark',
			});
		} finally {
			e.target.form?.reset();
		}
	};

	return (
		<div className='absolute text-center'>
			<form encType='multipart/form-data'>
				<input
					hidden
					type='file'
					accept='image/*'
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</form>
		</div>
	);
};

export default ImageUploaderComponent;
