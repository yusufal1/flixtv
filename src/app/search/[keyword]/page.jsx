"use client"
import React, { useEffect, useState } from 'react';
import { useTabs } from '@/app/Context/TabsContext';

const Page = ({ params }) => {
  
  const [matchingMovies, setMatchingMovies] = useState([])

  const keyword = params.keyword;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=9f34a27b7dd55dd1715d36f9f331c3d3&query=${keyword}&language=en-US&include_adult=false`
        );
        const movieData = await response.json();
        setMatchingMovies(movieData.results || []);
      } catch (error) {
        console.error('Filmler alınamadı:', error);
      }
    };

    fetchMovies();
  }, [keyword]);

  return (
  <div>
    {matchingMovies && matchingMovies.length > 0 ? (
      matchingMovies.map((movie, index) => (
        <div className='flex text-red-700' key={index}>
          <img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="" />
        </div>
      ))
    ) : (
      <div>Aranılan şey bulunamadı</div>
    )}
  </div>
);

};

export default Page;
