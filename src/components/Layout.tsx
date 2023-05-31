import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Toaster } from 'react-hot-toast'

interface Page {
    children : React.ReactNode
}

export const Layout = ({children}:Page) => {
  return (
    <>
    <Toaster/>
      <Header/>
        {children}
      <Footer/>
    </>
  )
}
