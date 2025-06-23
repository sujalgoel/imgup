'use client';

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ParticlesComponent from '../components/ParticlesComponent';
import ImageUploaderComponent from '../components/ImageUploaderComponent';

export default function HomePage(): React.JSX.Element {
	const [triggerForm, setTriggerForm] = useState(false);

	const handleButtonClick = () => {
		setTriggerForm(true);
		setTimeout(() => setTriggerForm(false), 5000);
	};

	return (
		<div className='flex! flex-col! items-center! justify-center! w-screen! h-screen! bg-gradient-to-tl! from-black! via-zinc-600/20! to-black!'>
			<ParticlesComponent
				className='absolute! inset-0! -z-10! fade-in-element'
				quantity={500}
			/>

			<div className='curtain-container'>
				<div className='curtain-line top hidden! md:block!' />

				<button onClick={handleButtonClick} className='title-text'>
					IMGUP
				</button>

				<div className='curtain-line bottom hidden! md:block!' />
			</div>

			<ToastContainer />

			<ImageUploaderComponent triggerForm={triggerForm} />

			<div className='mt-10! text-center! fade-in-element'>
				<h2 className='text-sm! text-zinc-500!'>
					Click on the text above to upload an image
				</h2>
			</div>
		</div>
	);
}
