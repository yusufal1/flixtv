import React from 'react';
import { BsBookmark, BsPlayCircle } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import moment from 'moment';

const MovieGrid = ({ movies, onMovieClick }) => {
  const [hoverStates, setHoverStates] = React.useState(new Array(movies.length).fill(false));

  
  const toggleHover = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = !newHoverStates[index];
    setHoverStates(newHoverStates);
  };

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 mt-8 relative'>
      {movies.map((movie, index) => (
        <div
          onClick={() => onMovieClick(movie.id)}
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
                <span className='text-xs text-white hover:!opacity-100'>{movie?.vote_average.toFixed(1)}</span>
              </div>
              <BsPlayCircle size={40} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            </div>
          </div>
          <div className='flex justify-between gap-10'>
            <p className='font-semibold'>{movie?.title || movie?.name}</p>
            <p>{moment(movie?.release_date).format('YYYY')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
