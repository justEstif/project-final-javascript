"use client";
import React, { useState, useEffect } from "react";
import { requests, getMoviesFromUrl, TMovie } from "@/lib/tmdb";
import Image from "next/image";
import { getGenre, randomEl } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const Hero = ({ children }: Props) => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [movie, setMovie] = useState<TMovie>();

  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await getMoviesFromUrl(requests.requestPopular);
      setMovies(() => popularMovies);
      setMovie(() => randomEl<TMovie>(popularMovies));
    };
    getMovies();
  }, []);

  useEffect(() => {
    // slideshow
    const interval = setInterval(() => {
      setMovie(randomEl(movies));
    }, 40000);
    return () => clearInterval(interval);
  });
  return (
    <div className="overflow-hidden relative w-full bg-gradient-to-bl from-gray-600 to-gray-900 h-[500px] group">
      <div className="relative z-10 w-full">{children}</div>
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={`https://image.tmdb.org/t/p/original/${movie?.title}` || "Poster"}
        className="object-cover w-full mix-blend-overlay"
        fill={true}
      />
      <div className="container mx-auto">
        <h1 className="text-4xl text-font-bold">{movie?.title}</h1>
        <p>{getGenre(movie)}</p>
        <p>Released: {movie?.release_date}</p>
        <p>Rating: {movie?.vote_average}</p>
        <p className="max-w-lg">{movie?.overview}</p>
      </div>
    </div>
  );
};

export default Hero;
