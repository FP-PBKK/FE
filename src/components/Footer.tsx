import React from 'react'
import { FaInstagram } from 'react-icons/fa'

export const Footer = () => {
    return (
        <div className='flex flex-col justify-between px-8 py-4 overflow-hidden text-lg md:flex-row md:text-title'>
        <div className="flex items-center justify-center">
        <h1 className="text-sm text-center md:text-lg">&copy;2023 Pose Palace</h1>
        </div>
        <div className="flex flex-row items-center justify-center">
            <h1 className="text-sm text-center h1 md:text-lg">Follow us on Instagram</h1>
            <a className="" href="https://instagram.com/silhouette.studioss?igshid=YmMyMTA2M2Y=" target="_blank" rel="noreferrer"><FaInstagram size={30}/></a>
        </div>
    </div>
    )
}
