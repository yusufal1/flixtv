"use client"
import MovieGrid from '@/components/movie-grid';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
  const [matchingMovies, setMatchingMovies] = useState([]);
  const keyword = params.keyword;
  const router = useRouter()

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
    <div className='px-[10%] bg-primary text-white pt-[5%] pb-[2%]'>
      {matchingMovies && matchingMovies.length > 0 ? (
        // MovieGrid bileşenini kullanarak matchingMovies'i gösterin
        <MovieGrid movies={matchingMovies} onMovieClick={(movieId) => router.push(`/movie/${movieId}`)}/>
      ) : (
        <div>Aranılan şey bulunamadı</div>
      )}
    </div>
  );
};

export default Page;
