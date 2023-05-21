import React from 'react'
interface Page {
    children : React.ReactNode
}
export const ImageCard = ({children}:Page) => {
  return (
    <div className='overflow-hidden rounded-sm w-44 md:w-64'>{children}</div>
  )
}
