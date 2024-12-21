import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/ui/footer";
import "./globals.css";
import Container from "./components/Pages/Container";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FloatingDockDemo } from "@/ui/floating-dock";
import { Toaster } from "@/components/ui/toaster";
import { Meteors } from "@/components/ui/meteors";
import { Inter } from 'next/font/google';
config.autoAddCss = false

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });

  const tags: any = [];
  const keywords = tags.length > 0 ? tags.join(", ") : "web development, JavaScript, React, Next.js, frontend, backend, full-stack, programming, coding, software engineering, technology, tutorial, guide, best practices, performance, SEO, web design, UI/UX, API, cloud computing";

export const metadata: Metadata = {
  title: "Alfiansah Erik Sugiarto",
  description: "Crafting Seamless Solutions in Cyberspace, Bridging the World of Full Stack Web Development.",
  keywords: keywords,
  openGraph: {
    images: [
      {
        url: "https://erikgat3s.studio/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ferikganz.35e228e2.jpg&w=3840&q=75",
        width: 800,
        height: 600,
        alt: "Alfiansah Erik Sugiarto"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <meta name="google-adsense-account" content="ca-pub-8993382717373531"></meta>
      <body className={`bg-white ${inter.className}`}>
        {/* <Meteors /> */}
        <Container>
        {/* <NavLinks /> */}
        <main className="mb-10">{children}</main>
        <FloatingDockDemo />
        <Toaster />
        </Container>
      </body>
    </html>
  )
}
