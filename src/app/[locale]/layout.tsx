import Notify from "@/components/ui/notify";
import { Toaster } from "@/components/ui/toaster";
import ClientProvider from "@/contexts/ClientProvider";
import HydrationProvider from "@/contexts/HydrationProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./tree.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const APP_NAME = "Tra từ đảo";
const APP_DEFAULT_TITLE = "Tra từ đảo";
const APP_TITLE_TEMPLATE = "%s - Tra từ đảo";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: "Tìm kiếm, tra cứu từ đảo tiếng Việt | " + APP_DEFAULT_TITLE,
    template: "%s - " + APP_TITLE_TEMPLATE,
  },
  description: "Công cụ tìm kiếm, tra cứu từ đảo trong tiếng Việt. Khám phá các từ nói lái và các hoán vị từ trong tiếng Việt.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tìm kiếm, tra cứu từ đảo tiếng Việt | " + APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: "Tìm kiếm, tra cứu từ đảo tiếng Việt | " + APP_DEFAULT_TITLE,
      template: "%s - " + APP_TITLE_TEMPLATE,
    },
    description: "Tìm kiếm và khám phá từ đảo, nói lái trong tiếng Việt một cách nhanh chóng và chính xác.",
    images: [
      {
        url: "/image/icon.png",
        width: 32,
        height: 32,
        alt: "Favicon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: "Tìm kiếm, tra cứu từ đảo tiếng Việt | " + APP_DEFAULT_TITLE,
      template: "%s - " + APP_TITLE_TEMPLATE,
    },
    description: "Công cụ giúp bạn tìm kiếm từ đảo trong tiếng Việt dễ dàng.",
    images: [
      {
        url: "/image/icon.png",
        width: 32,
        height: 32,
        alt: "Favicon",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};

const timeZone = "Asia/Bangkok";

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={cn("grid h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <HydrationProvider userAgent={userAgent}>
          <ClientProvider>
            <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
              {children}
              <Analytics />
              <SpeedInsights />
            </NextIntlClientProvider>
          </ClientProvider>
        </HydrationProvider>
        <Toaster />
        <Notify />
      </body>
    </html>
  );
}
