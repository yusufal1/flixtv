"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { BsFacebook, BsTwitter, BsInstagram, BsWhatsapp } from 'react-icons/bs'
import { AiFillMail, AiFillPhone, AiOutlineMail } from 'react-icons/ai'
import { Link } from 'react-scroll';


const Footer = () => {
    const router = useRouter()

  return (
    <div className='bg-[#141A25] px-[10%] text-white pt-[5%]'>
        <div className='flex gap-[10%]'>
            <div className='flex flex-col gap-4'>
                <div onClick={() => router.push("/")} className='flex font-bold items-end gap-1 cursor-pointer'>
                    <span className='text-2xl'>FLIX</span>
                    <span className='text-base text-secondary'>TV</span>
                </div>
                <div className='flex gap-3'>
                    <a href="/"><BsFacebook size={20} className='hover:scale-125 transition-all duration-300'/></a>
                    <a href="/"><BsTwitter size={20} className='hover:scale-125 transition-all duration-300'/></a>
                    <a href="/"><BsInstagram size={20} className='hover:scale-125 transition-all duration-300'/></a>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='font-bold'>FlixTV</h4>
                <ul className='flex flex-col gap-2'>
                    <li><a href="/" className='hover:text-secondary transition-colors'>About us</a></li>
                    <li><a href="/" className='hover:text-secondary transition-colors'>Contacs</a></li>
                    <Link to="movies" smooth={true} duration={500}>
                        <li className='hover:text-secondary transition-colors cursor-pointer'>Movies</li>
                    </Link>
                    <li><a href="/" className='hover:text-secondary transition-colors'>Live TV</a></li>
                </ul>
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='font-bold'>Browse</h4>
                <ul className='flex flex-col gap-2'>
                    <li><a href="/" className='hover:text-secondary transition-colors'>Live TV</a></li>
                    <li><a href="/" className='hover:text-secondary transition-colors'>Live News</a></li>
                    <li><a href="/" className='hover:text-secondary transition-colors'>Live Sports</a></li>
                    <li><a href="/" className='hover:text-secondary transition-colors'>TV Shows</a></li>
                </ul>
            </div>
            <div className='flex flex-col gap-4'>
                <ul className='flex flex-col gap-2'>
                    <li><a href="/" className='hover:text-secondary transition-colors'>Privacy policy</a></li>
                    <li><a href="/" className='hover:text-secondary transition-colors'>Terms and conditions</a></li>
                </ul>
            </div>
            <div className='flex flex-col gap-4'>
                    <div className='flex gap-3'>
                        <a href="tel:05362541817"><AiFillPhone size={20} className='hover:scale-125 transition-all duration-300'/></a>
                        <span>0216 216 16 16</span>
                    </div>
                    <div className='flex gap-3'>
                        <a href="https://wa.me/0500 000 00 00"><BsWhatsapp size={20} className='hover:scale-125 transition-all duration-300'/></a>
                        <span>0500 000 00 00</span>
                    </div>
                    <div className='flex gap-3'>
                        <a href="mailto:yusufal5558@gmail.com"><AiFillMail size={20} className='hover:scale-125 transition-all duration-300'/></a>
                        <span>0500 000 00 00</span>
                    </div>
            </div>
        </div>
        <div className='flex justify-between pb-[2%] mt-[8%] text-sm border-t border-gray-600'>
            <span className='mt-[2%]'>© FlixTV, 2023. Created by Yusuf AL.</span>
        </div>
    </div>
  )
}

export default Footer