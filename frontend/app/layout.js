import './globals.css'

export const metadata = {
    title: 'Our Year - Memory Notebook',
    description: 'A personal Christmas and New Year gift - a digital memory notebook',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
