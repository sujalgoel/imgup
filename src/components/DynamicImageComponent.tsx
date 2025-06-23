'use client';

import Image from 'next/image';

interface DynamicImageComponentProps {
	imagePath: string;
}

const DynamicImageComponent: React.FC<DynamicImageComponentProps> = ({
	imagePath,
}) => {
	return (
		<Image
			alt={imagePath}
			src={imagePath}
			width={1000}
			height={1000}
			quality={100}
			draggable='false'
			className='cursor-pointer w-full rounded-lg transition-transform duration-300 hover:scale-101'
			onClick={() => window.open(imagePath)}
		/>
	);
};

export default DynamicImageComponent;
