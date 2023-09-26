"use client"
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { BsBookmark, BsPlayCircle } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { useTabs } from '@/app/Context/TabsContext';
import { useRouter } from 'next/navigation';

import CatalogBar from './catalog-bar';

const MainSection = () => {
  const { tabs } = useTabs();
  const [movies, setMovies] = useState([]);
  const [hoverStates, setHoverStates] = useState([]);

  const router = useRouter();

  const toggleHover = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = !newHoverStates[index];
    setHoverStates(newHoverStates);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${
            tabs !== 'airing_today' ? 'movie' : 'tv'
          }/${tabs}?api_key=9f34a27b7dd55dd1715d36f9f331c3d3`
        );
        const movieData = await response.json();
        setMovies(movieData.results);
      } catch (error) {
        console.error('Filmler alınamadı:', error);
      }
    };

    fetchMovies();
  }, [tabs]);

  const updateMovies = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${
          tabs !== 'airing_today' ? 'movie' : 'tv'
        }/${tabs}?api_key=9f34a27b7dd55dd1715d36f9f331c3d3&with_genres=${genreId}`
      );
      const movieData = await response.json();
      setMovies(movieData.results);
    } catch (error) {
      console.error('Filmler alınamadı:', error);
    }
  };

  const updateMoviesByYear = async (selectedDate) => {
    try {
      const selectedYear = moment(selectedDate).format('YYYY');
      const response = await fetch(
        `https://api.themoviedb.org/3/${tabs !== 'airing_today' ? 'movie' : 'tv'}/${tabs}?api_key=9f34a27b7dd55dd1715d36f9f331c3d3&primary_release_year=${selectedYear}`
      );
      const movieData = await response.json();
      setMovies(movieData.results);
    } catch (error) {
      console.error('Filmler alınamadı:', error);
    }
  };

  return (
    <div className='px-[10%] bg-primary text-white pt-[5%] pb-[2%]'>
      <CatalogBar updateMovies={updateMovies} updateMoviesByYear={updateMoviesByYear} />
      <div className='grid grid-cols-4 gap-10 mt-8 relative'>
        {movies.map((movie, index) => (
          <div
            onClick={() => router.push(`/movie/${movie.id}`)}
            className='flex flex-col gap-3'
            key={movie.id}
          >
            <div
              onMouseEnter={() => toggleHover(index)}
              onMouseLeave={() => toggleHover(index)}
              className='relative cursor-pointer overflow-hidden rounded-2xl bg-gray-500 opacity-70 hover:bg-transparent hover:opacity-100 transition duration-500'
            >
              {movie?.backdrop_path == null ? (
                <div className='min-h-[193.16px]'></div>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  alt=''
                  className='object-cover relative hover:blur-sm hover:scale-110 transition duration-500 cursor-pointer'
                />
              )}
              <div className={`${hoverStates[index] ? '' : 'hidden'} transition duration-500`}>
                <div className='absolute top-5 left-5 bg-primary p-2 rounded-lg'>
                  <BsBookmark size={15} className='text-secondary hover:text-[#ffc312] transition duration-500' />
                </div>
                <div className='absolute top-5 right-5 flex gap-1 bg-primary p-2 rounded-lg'>
                  <AiOutlineStar size={15} className='text-secondary' />
                  <span className='text-xs text-white hover:!opacity-100'>{movie?.vote_average}</span>
                </div>
                <BsPlayCircle size={40} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              </div>
            </div>
            <div className='flex justify-between gap-10'>
              <p className='font-semibold'>{tabs !== 'airing_today' ? movie?.title : movie?.name}</p>
              <p>{tabs !== 'airing_today' ? moment(movie?.release_date).format('YYYY') : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
