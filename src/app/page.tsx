'use client';

import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ParticlesComponent from '../components/ParticlesComponent';
import ImageUploaderComponent from '../components/ImageUploaderComponent';

export default function HomePage(): JSX.Element {
	const [triggerForm, setTriggerForm] = useState(false);

	const handleButtonClick = () => {
		setTriggerForm(true);
		setTimeout(() => setTriggerForm(false), 5000);
	};

	return (
		<div className='flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
			<ParticlesComponent
				className='absolute inset-0 -z-10 animate-fade-in'
				quantity={500}
			/>

			<div className='hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-l from-zinc-300/0 via-zinc-300/50 to-zinc-300/0' />

			<button
				onClick={handleButtonClick}
				style={{
					WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)',
				}}
				className='z-10 text-7xl overflow-visible font-semibold text-transparent duration-1000 bg-white cursor-pointer text-edge-outline animate-title md:text-9xl whitespace-nowrap bg-clip-text'
			>
				IMGUP
			</button>

			<div className='hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0' />

			<ToastContainer />

			<ImageUploaderComponent triggerForm={triggerForm} />

			<div className='mt-10 text-center animate-fade-in'>
				<h2 className='text-sm text-zinc-500'>
					Click on the text above to upload an image
				</h2>
			</div>
		</div>
	);
}
