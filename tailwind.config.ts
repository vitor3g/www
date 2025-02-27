/** @type {import('tailwindcss').Config} */
import { withTV } from "tailwind-variants/transformer";
import tailwindAnimate from "tailwindcss-animate";
import tailwindReactAriaPlugin from "tailwindcss-react-aria-components";

const config = withTV({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: [
  				'var(--font-roboto-mono)'
  			]
  		},
  		colors: {
  			brex: {
  				signInLeftBorder: '#00000026'
  			},
  			light: 'hsl(var(--light))',
  			dark: 'hsl(var(--dark))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			toggle: 'hsl(var(--toggle))',
  			bg: 'hsl(var(--bg))',
  			fg: 'hsl(var(--fg))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				fg: 'hsl(var(--primary-fg))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				fg: 'hsl(var(--secondary-fg))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: {
  				DEFAULT: 'hsl(var(--tertiary))',
  				fg: 'hsl(var(--tertiary-fg))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				fg: 'hsl(var(--accent-fg))',
  				subtle: 'hsl(var(--accent-subtle))',
  				'subtle-fg': 'hsl(var(--accent-subtle-fg))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				fg: 'hsl(var(--success-fg))'
  			},
  			info: {
  				DEFAULT: 'hsl(var(--info))',
  				fg: 'hsl(var(--info-fg))'
  			},
  			danger: {
  				DEFAULT: 'hsl(var(--danger))',
  				fg: 'hsl(var(--danger-fg))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				fg: 'hsl(var(--warning-fg))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				fg: 'hsl(var(--muted-fg))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			overlay: {
  				DEFAULT: 'hsl(var(--overlay))',
  				fg: 'hsl(var(--overlay-fg))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			'3xl': 'calc(var(--radius) + 7.5px)',
  			'2xl': 'calc(var(--radius) + 5px)',
  			xl: 'calc(var(--radius) + 2.5px)',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'line-shadow': 'line-shadow 15s linear infinite',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		keyframes: {
  			'line-shadow': {
  				'0%': {
  					'background-position': '0 0'
  				},
  				'100%': {
  					'background-position': '100% -100%'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		}
  	}
  },
  plugins: [tailwindAnimate, tailwindReactAriaPlugin],
});

export default config;
