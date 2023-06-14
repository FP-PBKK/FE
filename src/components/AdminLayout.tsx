import { Toaster } from "react-hot-toast"
import Sidebar from "./Sidebar"

interface Page {
    children : React.ReactNode
}

export const AdminLayout = ({children}:Page) => {
  return (
    <>
    <Toaster/>
        <div className='flex flex-row relative'>
          <Sidebar />
          <div className='w-full'>
            {children}
          </div>
        </div>

      </>
  )
}
