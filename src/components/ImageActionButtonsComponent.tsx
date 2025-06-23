'use client';

import { useState } from 'react';

interface ImageActionButtonsProps {
	variant?: 'image' | 'error';
}

export default function ImageActionButtons({
	variant = 'image',
}: ImageActionButtonsProps) {
	const [isCopied, setIsCopied] = useState(false);

	const copyUrl = () => {
		navigator.clipboard.writeText(window.location.href);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1500);
	};

	const goHome = () => {
		window.location.href = '/';
	};

	if (variant === 'error') {
		return (
			<div className='flex! flex-col! sm:flex-row! text-center! mt-8!'>
				<button
					onClick={goHome}
					className='bg-white! cursor-pointer! text-black! font-semibold! py-3! px-8! rounded-lg! transition-all! duration-300! transform! hover:rounded-none!'
				>
					Go Home
				</button>
			</div>
		);
	}

	return (
		<div className='flex! flex-col! sm:flex-row! gap-4! mt-4!'>
			<button
				onClick={goHome}
				className='bg-white! cursor-pointer! text-black! font-semibold! py-3! px-8! rounded-lg! transition-all! duration-300! transform! hover:rounded-none!'
			>
				Go Home
			</button>

			<button
				onClick={copyUrl}
				className='flex-1! cursor-pointer! border! border-white/20! hover:border-white/40! text-white! font-semibold! py-3! px-6! rounded-lg! transition-all! duration-300! hover:bg-white/10!'
			>
				{isCopied ? 'URL Copied!' : 'Copy URL'}
			</button>
		</div>
	);
}
