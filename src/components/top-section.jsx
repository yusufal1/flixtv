"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Pagination, Navigation } from "swiper/core"; // Import required Swiper components
import { BsBookmark } from "react-icons/bs"
import { AiOutlineStar } from "react-icons/ai"
import { useRouter } from 'next/navigation'

SwiperCore.use([Pagination, Navigation]); // Add Swiper pagination and navigation modules to SwiperCore

const TopSection = () => {
  const router = useRouter()
  const [movies, setMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState(false)
  const [hoverStates, setHoverStates] = useState([]);

  const toggleHover = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = !newHoverStates[index];
    setHoverStates(newHoverStates);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=9f34a27b7dd55dd1715d36f9f331c3d3"
      );
      const movieData = await response.json();
      setMovies(movieData.results);
    };

    fetchMovies();
  }, []);

  return (
    <Swiper 
    spaceBetween={30} 
    slidesPerView={5}
    className="bg-primary !pl-[3%]"
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id} className="pt-5 pb-8">
          <div onClick={() => router.push(`/movie/${movie.id}`)} onMouseEnter={() => toggleHover(index)} onMouseLeave={() => toggleHover(index)} className="cursor-pointer shadow-lg w-[300px] overflow-hidden rounded-2xl bg-gray-500 opacity-70 hover:bg-transparent hover:opacity-100 transition duration-500">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" className="object-cover relative hover:scale-110 transition duration-500 cursor-pointer"/>
            <div className={`${hoverStates[index] ? "" : "hidden"} transition duration-500`}>
              <div className="absolute top-10 left-5 bg-primary p-2 rounded-lg">
                <BsBookmark size={15} className="text-secondary hover:text-[#ffc312] transition duration-500"/>
              </div>
              <div className="absolute flex gap-1 top-10 right-14 bg-primary p-2 rounded-lg">
                <AiOutlineStar size={15} className="text-secondary"/>
                <span className="text-xs text-white hover:!opacity-100">{movie.vote_average}</span>
              </div>
            </div>
        </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopSection;
