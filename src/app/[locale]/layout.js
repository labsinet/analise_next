import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { NextAuthProvider } from "./providers";

export function generateStaticParams() {
  return [{ locale: 'uk' }, { locale: 'en' }];
}

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });
  
  export const metadata = {
    icons: {
      icon: "./favicon.ico", 
    },
    title: "Student performance",
    description: "Аналіз успішності студентів",
  };

  export default async function LocaleLayout({ children, params }) {
    4//const { locale } = params;
    
     // Завантаження повідомлень для вибраної мови
    //const messages = (await import(`@/locales/${locale}.json`)).default;
    //try {

    //   messages = (await import(`@/locales/${locale}.json`)).default;
    // } catch (error) {
    //   console.error('Error loading messages:', error);
    //   messages = {}; // Фолбек на порожній об'єкт, щоб уникнути помилки
    // }
    const locale = params.locale;
    let messages;
    
    try {
      messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
      notFound();
    }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
             {children}
        </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
  }