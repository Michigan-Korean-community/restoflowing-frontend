import './globals.css';
import Script from 'next/script';
import { UserProvider } from './context/UserContext';
import AppHeader from '@/context/AppHeader';

export const metadata = {
    title: 'RestoFlowing',
    description: 'Restaurant Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const parseJwt = (token: string) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          return JSON.parse(jsonPayload);
        } catch (e) {
          console.error('JWT 디코딩 실패:', e);
          return null;
        }
      };
    return (
        <html
            lang="en"
            className="light-style layout-menu-fixed"
            data-theme="theme-default"
            data-template="vertical-menu-template-free"
        >
        <head>
            {/* ✅ Favicon */}
            <link rel="icon" href="/img/favicon/favicon.png" />

            {/* ✅ Sneat CSS */}
            <link rel="stylesheet" href="/css/vendor/core.css" />
            <link rel="stylesheet" href="/css/vendor/theme-default.css" />
            <link rel="stylesheet" href="/css/demo.css" />
            <link rel="stylesheet" href="/css/libs/perfect-scrollbar/perfect-scrollbar.css" />
            <link rel="stylesheet" href="/css/libs/apex-charts/apex-charts.css" />

            {/* ✅ JS: helpers → config 순서 중요 */}
            <script src="/js/vendor/helpers.js" defer></script>
            <script src="/js/config.js" defer></script>
        </head>
        <body>
            <UserProvider>
                <AppHeader />
                {children}
            </UserProvider>
            


        </body>
                {/* ✅ Sneat 관련 JS */}
                <Script src="/js/libs/jquery/jquery.js" strategy="afterInteractive" />
        <Script src="/js/libs/popper/popper.js" strategy="afterInteractive" />
        <Script src="/js/vendor/bootstrap.js" strategy="afterInteractive" />
        <Script src="/js/libs/perfect-scrollbar/perfect-scrollbar.js" strategy="afterInteractive" />
        <Script src="/js/vendor/menu.js" strategy="afterInteractive" />
        <Script src="/js/libs/apex-charts/apexcharts.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/js/dashboards-analytics.js" strategy="afterInteractive" />
        </html>
    );
}