import * as react from 'react'
import Links from './buttons/Links';
import ThemeButton from './buttons/ThemeButton';
import { FaAlignJustify, FaRegTimesCircle } from 'react-icons/fa';

export const Header = () => {
    const [open, setOpen] = react.useState(false)
    return (
        <nav className='sticky top-0 bg-white dark:bg-dark shadow-sm z-20 text-[12px] md:text-[20px] flex flex-col justify-center md:justify-between pt-2 md:pt-8 px-8 overflow-x-hidden'>
            <div className='flex'>
                <h1 className='block text-xl font-extrabold md:hidden'>Silhouette</h1>
                <button className='block ml-auto md:hidden ' onClick={() => setOpen(!open)}>
                {
                        open ? <FaRegTimesCircle className='' size={30} /> : <FaAlignJustify size={30} />
                }
                </button>
            </div>
            <div className='flex items-center justify-center md:justify-end'>
                <ul className={`text-lg md:text-xl font-bold flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:justify-items-end md:items-end items-center space-x-2 md:space-x-6 transition-all duration-1000 md:flex ${open ? "" : "hidden"}`}>
                    {links.map(({ href, label }) => (
                        <li key={`${href}${label}`}>
                            <Links href={href}>{label}</Links>
                        </li>
                    ))}
                    <li>
                    <ThemeButton />
                    </li>
                </ul>
                
            </div>

        </nav>
    )
}

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/pricelist', label: 'Pricelist' },
    { href: '/booking', label: 'Book Online' },
];