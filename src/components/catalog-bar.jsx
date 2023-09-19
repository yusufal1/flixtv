import React, { useState, useEffect } from 'react';
import { BiChevronDown } from "react-icons/bi";
import { useTabs } from '@/app/Context/TabsContext';

const CatalogBar = (props) => {
  const { tabs, setTabs } = useTabs();
  const [genres, setGenres] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9f34a27b7dd55dd1715d36f9f331c3d3')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleGenreClick = async (genreId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${tabs !== 'airing_today' ? 'movie' : 'tv'}/${tabs}?api_key=9f34a27b7dd55dd1715d36f9f331c3d3&with_genres=${genreId}`);
      const data = await response.json();
      console.log(data);
      setSelectedGenre(genreId);
      props.updateMovies(genreId);
    } catch (error) {
      console.error('Filmler alınamadı:', error);
    }
  }

  return (
    <div className='bg-[#172b4e] p-6 flex justify-between rounded-xl'>
      <ul className='flex items-center gap-7'>
        <li onClick={() => setShowList((current) => !current)} className='relative flex items-center gap-1 cursor-pointer transition-colors'>
          <div className='flex gap-2 cursor-pointer hover:text-secondary items-center'>
            <span>{selectedGenre !== null ? genres.find((genre) => genre.id === selectedGenre)?.name : 'All genres'}</span>
            <BiChevronDown/>
          </div>
          <div  className={`absolute  bg-[#172b4e] px-4 py-3  min-w-[160px] rounded-xl top-[75px] z-10 ${showList == false ? "hidden" : ""}`}>
            <div className='flex flex-col gap-3 max-h-[240px] overflow-y-scroll'>
              <ul>
                {genres.map((genre) => (
                  <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </li>
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
