import Logo from '@/assets/apple.svg?react';
// 1. 不加 ?react 使用 <img />
import { AiOutlineMenu, AiOutlineSearch, AiOutlineShopping } from 'react-icons/ai';
import { useContext, useState, useRef, useEffect } from 'react';
import DarkToggle from './DarkToggle';
import { AUTH_PAGES, SHOPPING_PAGES } from "@/assets/data/path"
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { CartContext } from '@/contexts/shopping';
import { IoLanguageOutline } from 'react-icons/io5';
import { languageSet, type LanguageCode,setLanguageCode } from '@/redux/i18n-slice';
import { useSelector,useDispatch} from 'react-redux';
import type { RootState } from '@/redux/store';
import { parseJwt } from '@/helpers/jwt';
import { logout } from '@/redux/user-slice';

export default function Header() {

    const [username, setUsername] = useState<string|null>(null);
    const { token } = useSelector((state: RootState) => state.user)
    const currentLanguage = useSelector<RootState, LanguageCode>((state: RootState) => state.i18n.langCode);
    const dispatch = useDispatch();

    const {cartItems} = useContext(CartContext)
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isSearchEnable,setIsSearchEnable ] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement|null>(null);

    const handleLanguageChange = () => {
        const currentIndex = languageSet.indexOf(currentLanguage);
        const nextIndex = (currentIndex + 1) % languageSet.length;
        console.log(nextIndex);
        if(nextIndex < 4) {
            dispatch(setLanguageCode(languageSet[nextIndex]!));
        } else {
            dispatch(setLanguageCode(languageSet[0]));
        } 
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // 处理搜索逻辑
            e.preventDefault();
            if(query.trim()) {
                navigate(`/search?query=${encodeURIComponent(query)}`);
                setQuery('');
            }
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setUsername(null);
        navigate('/auth/signin');
    }
    useEffect(() => {
        if(isSearchEnable) {
            inputRef.current?.focus();
        }
    }, [isSearchEnable])

    useEffect(() => {
        if(token) {
           const decode = parseJwt(token);
           if(decode && decode.name) {
            setUsername(decode.name);
           } 
        }
    }, [token])

    return (
        <nav className="text-sm flex items-center 
        justify-between px-4 h-16 sticky 
        top-0 z-50 bg-apple-white
        backdrop-blur-lg dark:bg-apple-black">
            <a href='#' className='text-xl font-bold'>
                <Logo className='size-6 hover:scale-105 transition-transform dark:fill-white' />
            </a>
            <div className='gap-3 hidden  md:flex 
            text-apple-text-light
            dark:text-apple-text-dark'>
                {SHOPPING_PAGES.map((page) => (
                    <NavLink
                    to={page.path}
                    key={page.path}
                    className={({isActive}) => `hover:text-apple-blue ${
                        isActive 
                        ? 'text-apple-blue font-extrabold' 
                        : 'text-apple-text-light dark:text-apple-text-dark'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                    >
                        {page.title}
                    </NavLink>
                ))}
            </div>
            { isSearchEnable && (
                <div className='relative'>
                    <input 
                    ref={inputRef}
                    className='peer border border-apple-gray-200
                    px-4 py-2 flex-1 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-apple-blue transition'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                    <label
                    className='absolute left-2 top-2 
                    peer-focus:-top-2
                    peer-focus:text-xs
                    peer-focus:text-apple-blue
                    transition-all 
                    text-apple-text-light
                   dark:text-apple-text-dark
                    '
                    >搜索...
                    </label>
                </div>
            )}
            <div className='gap-2  flex items-center space-x-2 text-apple-text-light dark:text-apple-text-dark'>
                <button
                onClick={() => setIsSearchEnable(!isSearchEnable)}
                >
                    <AiOutlineSearch size={24} />
                </button>
                <DarkToggle />
                <button
                onClick={() => handleLanguageChange()}
                >
                    <IoLanguageOutline size={24} />
                </button>
                <button
                className='relative'
                onClick={() => navigate('/cart')}
                >
                    <AiOutlineShopping size={24} />
                    <AnimatePresence>
                        {cartItems.length > 0 && (
                            <Motion.span
                            className="absolute
                            top-0 right-0 translate-x-1/2 -translate-y-1/2
                            bg-apple-red text-white text-xs font-bold 
                            size-5 rounded-full flex items-center justify-center
                            "
                            key={cartItems.length}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{  scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                {cartItems.length}
                            </Motion.span>
                        )}
                    </AnimatePresence>
                </button>
                {username ? (
                   <>
                   <span className='hidden md:block'>{username}</span>
                   <button
                   onClick={handleLogout}
                   className='hidden md:block hover:text-apple-blue'
                   >
                    登出
                   </button>
                   </>
                ) : (
                    AUTH_PAGES.map((page) => (
                        <NavLink
                        key={page.id}
                        to={page.path}
                        className={({isActive}) => `hover:text-apple-blue hidden md:inline-block ${
                            isActive 
                            ? 'text-apple-blue font-extrabold' 
                            : 'text-apple-text-light dark:text-apple-text-dark'
                          }
                        `}
                        >
                            {page.title}
                        </NavLink>
                    ))
                )}
                <button 
                className='md:hidden'
                onClick={() => setIsOpen(true)}
                >
                  <AiOutlineMenu size={24} />
                </button>
            </div>
            {isOpen && (
                <div
                    className='fixed inset-0 z-40
                    bg-apple-black/50
                    dark:bg-apple-white/10
                    backdrop-blur-md'
                    onClick={() => setIsOpen(false)}
                >
                </div>
            )}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 z-50 ${!isOpen && "hidden"}`}>
                <div className='flex flex-col mt-17  space-y-6
                bg-apple-light
                dark:bg-apple-dark
                  shadow-apple-md
                text-apple-text-light
                   dark:text-apple-text-dark
                   text-center p-6 rounded-lg'>
                    {SHOPPING_PAGES.map((page) => (
                        <NavLink
                        to={page.path}
                        key={page.path}
                        className={({isActive}) => `
                          hover:text-apple-blue ${
                            isActive
                            ? 'text-apple-blue font-extrabold'
                            : 'text-apple-text-light dark:text-apple-text-dark'
                          }
                        `}
                        onClick={() => setIsOpen(false)}
                        >
                            {page.title}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    )
}