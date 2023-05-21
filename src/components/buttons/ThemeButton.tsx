import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from 'next-themes';
const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
    return (
        <>
            <button className='p-2 transition-all duration-300' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
        </>
    )
}

export default ThemeButton