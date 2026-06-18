import './globals.css'
import type { Metadata } from 'next'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css"
        />
      </head>

      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.theautokingusa.com'),

  title: {
    default: 'TheAutoKingUSA',
    template: '%s | TheAutoKingUSA',
  },

  description: 'Quality tested used engines and transmissions across the USA.',

  authors: [{ name: 'The Auto King USA' }],

  publisher: 'The Auto King USA',

  robots: {
    index: true,
    follow: true,
  },
}