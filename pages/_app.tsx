import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '../src/components/Navbar'
import { AuthProvider } from '../src/useAuth'
import '../src/styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  
  return (
  <AuthProvider>
    
    <Head>
      <title>SomeWhere</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className='w-screen h-screen flex flex-col overflow-auto font-semibold bg-white text-black dark:bg-neutral-800 dark:text-white'>
      <Navbar />
      <Component {...pageProps} />
    </main>

  </AuthProvider>
  )
}

export default MyApp
