'use client'
import React from 'react';
import { BiChevronDown } from "react-icons/bi";
import { useTabs } from '@/app/Context/TabsContext';

const CatalogBar = () => {
  const { tabs, setTabs } = useTabs();

  return (
    <div className='bg-[#172b4e] p-6 flex justify-between rounded-xl'>
      <ul className='flex items-center gap-7'>
        <li className='flex items-center gap-1 cursor-pointer hover:text-secondary transition-colors'><span>All genres</span> <BiChevronDown/></li>
        <li className='flex items-center gap-1 cursor-pointer hover:text-secondary transition-colors'><span>All the years</span> <BiChevronDown/></li>
      </ul>
      <ul className='flex gap-5 items-center bg-primary p-2 rounded-xl font-medium'>
        <li onClick={() => setTabs('top_rated')} className={`${tabs === 'top_rated' && 'bg-[#172b4e] text-secondary rounded-xl'} cursor-pointer p-1`}>Top Rated</li>
        <li onClick={() => setTabs('popular')} className={`${tabs === 'popular' && 'bg-[#172b4e] text-secondary rounded-xl'} cursor-pointer p-1`}>Popular</li>
        <li onClick={() => setTabs('airing_today')} className={`${tabs === 'airing_today' && 'bg-[#172b4e] text-secondary rounded-xl'} cursor-pointer p-1`}>Newest</li>
      </ul>
    </div>
  )
}

export default CatalogBar;
