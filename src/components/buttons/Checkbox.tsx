import React from 'react'

interface Page {
    children : React.ReactNode
    onClick?: (e:any) => void;
    value : string
  }
const Checkbox = ({children,onClick,value}:Page) => {
  return (
    <button onClick={onClick} value={value} type="button" className='cursor-pointer overflow-hidden z-40 w-20 md:w-32 border-solids border-2 mr-4 border-black rounded-sm hover:bg-gray-400'>{children}</button>
  )
}

export default Checkbox