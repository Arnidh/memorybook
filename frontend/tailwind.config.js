/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                cream: '#FFF8E7',
                'warm-brown': '#8B7355',
                'dark-brown': '#5C4033',
                'festive-red': '#C41E3A',
                'festive-green': '#165B33',
                'gold': '#FFD700',
            },
            fontFamily: {
                handwriting: ['Caveat', 'cursive'],
                serif: ['Merriweather', 'serif'],
            },
            animation: {
                'page-flip': 'pageFlip 0.6s ease-in-out',
                'float': 'float 3s ease-in-out infinite',
                'sparkle': 'sparkle 1.5s ease-in-out infinite',
            },
            keyframes: {
                pageFlip: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(-180deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                sparkle: {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
