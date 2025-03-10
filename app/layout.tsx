import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

// Load Tajawal font - great for Arabic text
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: "يومي في رمضان - تتبع عباداتك",
  description: "تطبيق لتتبع العبادات والأعمال الصالحة خلال شهر رمضان المبارك",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <head>
        {/* Corrected the path to reference the public folder */}
        <link rel='icon' href='/images/logo.svg' />
      </head>
      <body className={`${tajawal.variable} font-sans`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}



import './globals.css'