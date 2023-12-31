"use client"
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { PiSignInBold } from 'react-icons/pi'
import { HiStatusOnline } from 'react-icons/hi'
import { Link } from 'react-scroll';
import { Squash as Hamburger } from 'hamburger-react'

const Header = ({ isLoading, setIsLoading }) => {
    const [otherLinks, setOtherLinks] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [scrollPosition, setSrollPosition] = useState(0);
    const [isOpen, setOpen] = useState(false)
    const router = useRouter()

    const searchFunc = (e) => {
        if((e.key === 'Enter' || e.type === 'click') && keyword.length >= 3) {
            router.push(`/search/${keyword}`)
        }
    }

    const handleScroll = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div className={`flex flex-row py-7 px-[10%] whitespace-nowrap bg-primary text-white items-center gap-5 justify-between lg:fixed top-0 lg:mb-[10%] z-10 w-full transition-all duration-300 ${scrollPosition > 150 ? "bg-[#212638] transition-all duration-300" : ""} ${isOpen ? "flex-col" : "flex-row"}`}>
        <div className='block xl:hidden'>
            <Hamburger size={20} toggled={isOpen} toggle={setOpen}/>
        </div>
        <div onClick={() => router.push("/")} className='flex font-bold items-end gap-1 cursor-pointer'>
            <span className='text-3xl'>FLIX</span>
            <span className='text-lg text-secondary'>TV</span>
        </div>
        <div className={`flex justify-between font-medium basis-1/2`}>        
            <ul className={`xl:flex hidden xl:gap-0 gap-3 justify-between font-medium w-full items-center ${isOpen ? "!flex flex-col" : "hidden"}`}>
                <li>
                    <a href="/" className='hover:text-secondary transition-colors'>Home</a>
                </li>
                <Link to="movies" smooth={true} duration={500}>
                    <li className='hover:text-secondary transition-colors cursor-pointer'>Movies</li>
                </Link>
                <li>
                    <a href="/about" className='hover:text-secondary transition-colors'>About us</a>
                </li>
                <li className='flex items-center gap-2'>
                    <a href="/" className='hover:text-secondary transition-colors'>LIVE</a>
                    <HiStatusOnline size={15} className='text-red-600'/>
                </li>
                <li className='xl:hidden'>
                    <a href="/" className='hover:text-secondary transition-colors'>Sign in</a>
                </li>
                <li className='xl:hidden'>
                    <a href="/" className='hover:text-secondary transition-colors'>Terms and conditions</a>
                </li>
                <li className='xl:hidden'>
                    <a href="/" className='hover:text-secondary transition-colors'>Sign up</a>
                </li>
                <li className='xl:hidden'>
                    <a href="/" className='hover:text-secondary transition-colors'>Forgot password</a>
                </li>
                <li className='xl:hidden'>
                    <a href="/" className='hover:text-secondary transition-colors'>Privacy policy</a>
                </li>
                <li className='xl:hidden'>
                    <a href="/" className='hover:text-secondary transition-colors'>Terms and conditions</a>
                </li>
                <li className='hidden xl:block'>
                    <span onClick={() => setOtherLinks((current) => !current)} className='hover:text-secondary transition-colors relative cursor-pointer'>...</span>
                    <div className={`absolute  bg-[#172b4e] px-4 py-3  min-w-[160px] rounded-xl top-[75px] z-10 ${otherLinks ? "" : "hidden"}`}>
                        <div className='flex flex-col gap-3 max-h-[240px] overflow-y-scroll'>
                            <a href="/">Contacts</a>
                            <a href="/">Privacy policy</a>
                            <a href="/">Terms and conditions</a>
                            <a href="/">Sign in</a>
                            <a href="/">Sign up</a>
                            <a href="/">Forgot password</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div className='flex justify-between gap-5'>
            <div className={`sm:flex hidden justify-between items-center rounded-lg bg-[#172b4e] px-5 py-2 ${isOpen && "!flex"}`}>
                <input onKeyDown={searchFunc} onChange={e => setKeyword(e.target.value)} type="text" className='bg-transparent outline-none placeholder:text-white' placeholder="I'm looking for..."/>
                <BiSearch onClick={searchFunc} size={25} className='text-secondary cursor-pointer'/>
            </div>
            <div className='lg:flex hidden justify-between items-center gap-2'>
                <a className='hover:text-secondary transition-colors' href='/'>Sign in</a>
                <PiSignInBold size={25} className='text-secondary cursor-pointer'/>
            </div>
        </div>
    </div>
  )
}

export default Header