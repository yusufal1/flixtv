import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from "react-icons/bi";
import { useTabs } from '@/app/Context/TabsContext';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const CatalogBar = (props) => {
  const { tabs, setTabs } = useTabs();
  const [genres, setGenres] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);

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

  useEffect(() => {
    const fetchMoviesByYear = async () => {
      try {
        // Seçilen yılı alın
        const selectedYear = moment(startDate).format('YYYY');
  
        // API'den seçilen yıla ait filmleri getirin
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=9f34a27b7dd55dd1715d36f9f331c3d3&primary_release_year=${selectedYear}`);
        const data = await response.json();
  
        // Elde edilen filmleri kullanın veya başka bir işlem yapın
        console.log(data);
  
        // props.updateMovies() veya başka bir işlem yapabilirsiniz
      } catch (error) {
        console.error('Filmler alınamadı:', error);
      }

        props.updateMoviesByYear(startDate);
    };
  
    fetchMoviesByYear();
  }, [startDate]);

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

  const handleAllYearsClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
    
  }


  return (
    <div className='bg-[#172b4e] p-6 flex justify-between rounded-xl'>
      <ul className='flex items-center gap-7'>
        <li onClick={() => setShowList((current) => !current)} className='relative flex items-center gap-1 cursor-pointer transition-colors'>
          <div className='flex gap-2 cursor-pointer hover:text-secondary items-center'>
            <span>{selectedGenre !== null ? genres.find((genre) => genre.id === selectedGenre)?.name : 'All genres'}</span>
            <BiChevronDown/>
          </div>
          <div  className={`absolute  bg-[#172b4e] px-4 py-3  min-w-[160px] rounded-xl top-[75px] z-10 ${showList === false ? "hidden" : ""}`}>
            <div className='flex flex-col gap-3 max-h-[240px] overflow-y-scroll'>
              <ul>
                {genres.map((genre) => (
                  <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </li>
        <li onClick={handleAllYearsClick} className='flex items-center gap-1 relative'>
        <div className='flex gap-2 hover:text-secondary items-center'>
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showYearPicker
            dateFormat="yyyy"
            className=' outline-none bg-transparent w-1/2 cursor-pointer'
          />
          <BiChevronDown className='-ml-[72%]'/>
        </div>
          
        </li>
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
