
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout'
import ImageHome from '@/components/ImageHome'
import home from "../components/image/home.webp"
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <Layout>
     <div className='space-y-4 overflow-hidden min-h-main'>
          <div className='flex items-center justify-center px-10 mt-10 overflow-hidden md:mt-20 h-1/2'>
            <Image className='transition duration-500 ease-in-out contrast-50 w-96 md:w-full hover:scale-105 hover:contrast-100' width={1920} height={700} src={home} alt='home' />
          </div>
          <div><ImageHome /></div>
        </div>
   </Layout>
  )
}
