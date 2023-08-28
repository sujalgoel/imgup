import { useEffect, useState } from 'react';

interface MousePosition {
	x: number;
	y: number;
}

export function useMousePosition(): MousePosition {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleMove = (event: MouseEvent | TouchEvent) => {
			const clientX =
				'clientX' in event ? event.clientX : event.touches[0].clientX;
			const clientY =
				'clientY' in event ? event.clientY : event.touches[0].clientY;
			setMousePosition({ x: clientX, y: clientY });
		};

		window.addEventListener('mousemove', handleMove);
		window.addEventListener('touchmove', handleMove);

		return () => {
			window.removeEventListener('mousemove', handleMove);
			window.removeEventListener('touchmove', handleMove);
		};
	}, []);

	return mousePosition;
}
