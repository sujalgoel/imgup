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
			alt={`https://i.sujalgoel.me/${imagePath}`}
			src={`https://i.sujalgoel.me/${imagePath}`}
			width={1000}
			height={1000}
			quality={100}
			draggable='false'
			className='cursor-pointer w-full rounded-lg'
			onClick={() => window.open(`https://i.sujalgoel.me/${imagePath}`)}
		/>
	);
};

export default DynamicImageComponent;
