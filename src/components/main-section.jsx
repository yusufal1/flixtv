"use client"
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useTabs } from '@/app/Context/TabsContext';
import { useRouter } from 'next/navigation';

import CatalogBar from './catalog-bar';
import MovieGrid from './movie-grid';

const MainSection = ({ searchResults }) => {
  const { tabs } = useTabs();
  const [movies, setMovies] = useState([]);
  const [hoverStates, setHoverStates] = useState([]);

  const router = useRouter();

  const toggleHover = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = !newHoverStates[index];
    setHoverStates(newHoverStates);
  };

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

  useEffect(() => {
    if (!searchResults) {
      setMovies([]);
    } else {
      setMovies(searchResults);
    }
  }, [searchResults]);

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

  return (
    <div className='px-[10%] bg-primary text-white pt-[5%] pb-[2%]'>
      <CatalogBar updateMovies={updateMovies} updateMoviesByYear={updateMoviesByYear} />
      <MovieGrid movies={movies} onMovieClick={(movieId) => router.push(`/movie/${movieId}`)} hoverStates={hoverStates} toggleHover={toggleHover} />
    </div>
  );
};

export default MainSection;

