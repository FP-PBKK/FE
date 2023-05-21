import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

interface Page {
    children : React.ReactNode
}

export const Layout = ({children}:Page) => {
  return (
    <>
      <Header/>
        {children}
        <Footer/>
    </>
  )
}
