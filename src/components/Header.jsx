import Logo from '@/assets/apple.svg?react';
// 1. 不加 ?react 使用 <img />
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import DarkToggle from './DarkToggle';
import { SHOPPING_PAGES } from "@/assets/data/path"
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isSearchEnable,setIsSearchEnable ] = useState(false);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // 处理搜索逻辑
            e.preventDefault();
            if(query.trim()) {
                navigate(`/search?query=${encodeURIComponent(query)}`);
                setQuery('');
            }
        }
    };

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
            <div className='gap-2 space-x-2 text-apple-text-light dark:text-apple-text-dark'>
                <button
                onClick={() => setIsSearchEnable(!isSearchEnable)}
                >
                    <AiOutlineSearch size={24} />
                </button>
                <DarkToggle />
                <button 
                className='md:hidden'
                onClick={() => setIsOpen(true)}
                >
                  <AiOutlineMenu size={24} />
                </button>
            </div>
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 ${!isOpen && "hidden"}`}>
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
            {isOpen && (
                <div 
                    className='fixed inset-0 
                    bg-apple-black/50 
                    dark:bg-apple-white/10 
                    backdrop-blur-md'
                    onClick={() => setIsOpen(false)}
                >
                </div>
            )}
        </nav>
    )
}