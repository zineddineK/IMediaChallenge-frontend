import { theme } from '@chakra-ui/react'

export const customTheme = {
	...theme,
	fonts: {
		body: 'Roboto, sans-serif',
		heading: 'Roboto, sans-serif',
		mono: 'Roboto, sans-serif',
	},
	fontSizes: {
		xxs: '9px',
		xs: '12px',
		sm: '14px',
		md: '16px',
		lg: '18px',
		xl: '20px',
		'2xl': '24px',
		'3xl': '28px',
		'4xl': '30px',
		'5xl': '32px',
		'6xl': '48px',
		'7xl': '56px',
	},
	colors: {
		...theme.colors,
		gray: {
			...theme.colors.gray,
			50: '#F8F8F8',
			60: '#6C6C6C',
			100: '#F5F6FA',
			150: '#D0D0D0',
			200: theme.colors.gray[200], // borders-color
			250: '#707071',
			300: '#F0F0F2',
			400: '#EAF0F4',
			500: '#D7DAE2',
			600: '#A0AEC0',
			700: '#A3A6B4',
			800: '#707070',
			900: '#4D4F5C',
			950: '#E2E2E2',
		},
		green: {
			...theme.colors.green,
			50: '#8DC731',
			100: '#5AEFA5',
		},
		orange: {
			...theme.colors.orange,
			50: '#EFC05A',
			100: '#C79831',
			150: '#E57B00',
		},
		blue: {
			...theme.colors,
			50: '#3B86FF',
			100: '#007FFF',
			150: '#6751DE',
		},
		red: {
			...theme.colors.red,
			50: '#C74831',
			100: '#DE5151',
			150: '#D44E4E',
		},
	},
}
