/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			animation: {
				title: 'title 3s ease-out forwards',
				'fade-in': 'fade-in 3s ease-in-out forwards',
				'fade-left': 'fade-left 3s ease-in-out forwards',
				'fade-right': 'fade-right 3s ease-in-out forwards',
			},
			keyframes: {
				'fade-in': {
					'0%': {
						opacity: '0%',
					},
					'25%': {
						opacity: '0%',
					},
					'80%': {
						opacity: '75%',
					},
					'100%': {
						opacity: '100%',
					},
				},
				'fade-left': {
					'0%': {
						opacity: '0%',
						transform: 'translateX(100%)',
					},
					'25%': {
						opacity: '100%',
						transform: 'translateX(0%)',
					},
					'100%': {
						opacity: '0%',
					},
				},
				'fade-right': {
					'0%': {
						opacity: '0%',
						transform: 'translateX(-100%)',
					},
					'25%': {
						opacity: '100%',
						transform: 'translateX(0%)',
					},
					'100%': {
						opacity: '0%',
					},
				},
				title: {
					'0%': {
						opacity: '0',
						'line-height': '0%',
						'letter-spacing': '0.25em',
					},
					'25%': {
						opacity: '0%',
						'line-height': '0%',
					},
					'80%': {
						opacity: '100%',
					},
					'100%': {
						opacity: '100%',
						'line-height': '100%',
					},
				},
			},
		},
	},
	plugins: [],
};
