import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'UAE Waters - Quality Water Delivery Service',
    template: '%s | UAE Waters',
  },
  description: 'Quality water delivery service across UAE. From natural spring to mineral water, we deliver purity to your doorstep. Fast delivery, quality guaranteed.',
  keywords: ['water delivery', 'UAE', 'quality water', 'mineral water', 'spring water', 'drinking water', 'Dubai', 'Abu Dhabi'],
  authors: [{ name: 'UAE Waters' }],
  creator: 'UAE Waters',
  publisher: 'UAE Waters',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://uae-waters.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://uae-waters.netlify.app',
    siteName: 'UAE Waters',
    title: 'UAE Waters - Quality Water Delivery Service',
    description: 'Quality water delivery service across UAE. From natural spring to mineral water, we deliver purity to your doorstep.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UAE Waters - Quality Water Delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UAE Waters - Quality Water Delivery Service',
    description: 'Quality water delivery service across UAE. From natural spring to mineral water, we deliver purity to your doorstep.',
    images: ['/og-image.jpg'],
    creator: '@uaewaters',
  },
  verification: {
    google: 'google-site-verification',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "UAE Waters",
              "url": "https://uae-waters.netlify.app",
              "logo": "https://uae-waters.netlify.app/logo.png",
              "description": "Quality water delivery service across UAE",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AE",
                "addressRegion": "Dubai",
                "addressLocality": "Dubai"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-4-123-4567",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic"]
              },
              "sameAs": [
                "https://facebook.com/uaewaters",
                "https://instagram.com/uaewaters",
                "https://twitter.com/uaewaters"
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
