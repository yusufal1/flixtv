"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BsBookmark } from "react-icons/bs"
import { AiOutlineStar } from "react-icons/ai"
import { useRouter } from 'next/navigation'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TopCardSkeleton from "@/app/skeletons/TopCardSkeleton";



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
    <SkeletonTheme baseColor="#515764" highlightColor="#444" className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 mt-8 relative">
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          540: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="bg-primary !pl-[3%] !pt-[7%]"
      >
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <SwiperSlide key={movie.id} className="pt-5 pb-8">
              <div onClick={() => router.push(`/movie/${movie.id}`)} onMouseEnter={() => toggleHover(index)} onMouseLeave={() => toggleHover(index)} className="cursor-pointer shadow-lg overflow-hidden rounded-2xl bg-gray-500 opacity-70 hover:bg-transparent hover:opacity-100 transition duration-500">
                <div className="relative">
                  <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className="object-cover relative hover:scale-110 transition duration-500 cursor-pointer"/>
                  <div className={`${hoverStates[index] ? "" : "hidden"} transition duration-500`}>
                    <div className="absolute top-8 left-5 bg-primary p-2 rounded-lg">
                      <BsBookmark size={15} className="text-secondary hover:text-[#ffc12] transition duration-500"/>
                    </div>
                    <div className="absolute flex gap-1 top-8 right-5 bg-primary p-2 rounded-lg">
                      <AiOutlineStar size={15} className="text-secondary"/>
                      <span className="text-xs text-white hover:!opacity-100">{movie.vote_average}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="flex flex-row gap-10">
            <TopCardSkeleton cards={4} />
          </div>
        )}
      </Swiper>
    </SkeletonTheme>
  );
};

export default TopSection;
