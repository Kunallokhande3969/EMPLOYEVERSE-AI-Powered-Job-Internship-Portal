// pages/_app.js
import { Suspense, useEffect, useState } from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // मोबाइल टच ठीक करने के लिए
    if (typeof window !== 'undefined') {
      import('fastclick').then(({ default: FastClick }) => {
        FastClick.attach(document.body);
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <Component {...pageProps} />
      </Suspense>
    </>
  );
}