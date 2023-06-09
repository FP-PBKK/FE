import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from 'next-themes';
import * as react from 'react'
const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = react.useState(false);

    react.useEffect(() => setMounted(true), []);
    return (
        <>
            <button className='p-2 transition-all duration-300' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
               {mounted ? <>{theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}</> : <FaSun size={20}/>} 
            </button>
        </>
    )
}

export default ThemeButton