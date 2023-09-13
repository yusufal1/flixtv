import React from 'react';
import { BsPlayCircle } from "react-icons/bs"
import { AiOutlineStar } from "react-icons/ai"
import { BiSolidCircle } from "react-icons/bi"
import moment from 'moment';

const getMovie = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9f34a27b7dd55dd1715d36f9f331c3d3`);
  return await res.json();
};

const getMovieVideo = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9f34a27b7dd55dd1715d36f9f331c3d3`);
    return await res.json();
  };

const Page = async ({ params }) => {
  const id = params.id;
  const movieDetail = await getMovie(id);
  const movieVideo = await getMovieVideo(id);
  console.log("videoooo", movieVideo);

  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`;

  const containerStyle = {
    backgroundImage: `url('${backgroundImageUrl}')`,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Koyu transparan gri
  };

  return (
    <div className="h-screen relative">
  <div className="bg-cover bg-center absolute inset-0" style={containerStyle}></div>
  <div className='absolute inset-0 bg-gray-950 opacity-80'></div>
  <div className='flex flex-col relative pt-[10%] px-[10%] w-3/5'>
    <div className='flex gap-4 w-fit items-center text-white hover:text-secondary transition-colors duration-300 cursor-pointer'>
      <BsPlayCircle size={40}/>
      <span className='text-2xl'>Trailer</span>
    </div>
    <h2 className='text-white text-4xl mt-[4%]'>{movieDetail?.title}</h2>
    <div className='flex mt-[2%] gap-5'>
        <div className='flex items-center gap-2'>
            <AiOutlineStar size={20} className='text-secondary'/>
            <span className='text-white'>{movieDetail?.vote_average.toFixed(1)}</span>
        </div>
        <div className='flex items-center gap-2'>
            <BiSolidCircle size={7} className='text-secondary'/>
            <span className='text-white'>{movieDetail?.genres[0]?.name}</span>
        </div>
        <div className='flex items-center gap-2'>
            <BiSolidCircle size={7} className='text-secondary'/>
            <span className='text-white'>{moment(movieDetail?.release_date).format('YYYY')}</span>
        </div>
        <div className='flex items-center gap-2'>
            <BiSolidCircle size={7} className='text-secondary'/>
            <span className='text-white'>{Math.floor(movieDetail?.runtime / 60)} h {Math.floor(movieDetail?.runtime % 60)} min</span>
        </div>
    </div>
    <p className='mt-[5%] text-white'>{movieDetail?.overview}</p>
    {
        movieVideo?.results[0]?.site == "YouTube" ?
        <iframe
        width="100%"
        height="400px"
        src={`https://www.youtube.com/embed/${movieVideo.results[0].key}`}
        frameborder="0"
        allowfullscreen
        className='rounded-3xl mt-[4%]'
        title="Movie Trailer"
      ></iframe>
      : 
      <iframe
        width="100%"
        height="400px"
        src={`https://player.vimeo.com/video/${movieVideo.results[0].key}`}
        frameborder="0"
        allowfullscreen
        className='rounded-3xl mt-[4%]'
        title="Movie Trailer"
      ></iframe>
    }
  </div>
</div>

  );
};

export default Page;
