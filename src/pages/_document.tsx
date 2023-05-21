import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='transition-colors bg-white dark:bg-dark dark:text-gray-300'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
