import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import React, { FC, useEffect, useRef, ChangeEvent } from 'react';

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

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (!e.target.files) return;

		const file = e.target.files[0];

		const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

		if (file && !file.type.match(fileTypes.join('|'))) {
			toast.error('Only PNG, JPEG, and JPG files are allowed!', {
				position: 'bottom-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});

			return e.target.form?.reset();
		}

		const formData = new FormData();
		formData.append('image', file);

		try {
			const res = await fetch('https://imgup-backend.vercel.app/', {
				method: 'POST',
				body: formData,
				cache: 'no-cache',
			});

			const data = await res.json();

			if (!data.id) {
				toast.error(data.error, {
					position: 'bottom-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});

				return e.target.form?.reset();
			}

			router.push(`/${data.id}`);

			e.target.form?.reset();
		} catch (error) {
			console.log(error);

			toast.error('An error occurred! Please try again later.', {
				position: 'bottom-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});

			return e.target.form?.reset();
		}
	};

	return (
		<div className='absolute text-center'>
			<form id='submit' action='/' method='post' encType='multipart/form-data'>
				<input
					hidden
					id='file'
					required
					type='file'
					name='image'
					accept='image/*'
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</form>
		</div>
	);
};

export default ImageUploaderComponent;
