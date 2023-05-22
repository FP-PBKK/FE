import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import * as react from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import '@/styles/nprogress.css'


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  react.useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  return (
    <ThemeProvider defaultTheme='dark' attribute='class' enableSystem={false} >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
