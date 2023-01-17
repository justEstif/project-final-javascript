"use client";
import useStore from "@/lib/store";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { getLikedMovies } from "@/lib/firebase";
import { getMovieInfo, TMovie } from "@/lib/tmdb";
import { useEffect, useState } from "react";
import Movie from "@/components/Movie";
import { nanoid } from "nanoid";

type Props = {};

const page = ({ }: Props) => {
  const { user } = useStore((state) => state);
  const router = useRouter();
  if (!user) router.push("/sign-in");
  const [likedMovies, setLikedMovies] = useState<TMovie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const likedMoviesId: number[] = await getLikedMovies(user?.docId || "");
      const movies = await Promise.all(
        likedMoviesId.map(async (id) => await getMovieInfo(id))
      );
      setLikedMovies(movies);
    };
    getMovies();
  }, []);

  if (!user) router.push("/sign-in");
  return (
    <div className="container mx-auto min-h-screen">
      <NavBar />
      <div className="grid grid-cols-4 gap-5">
        {likedMovies
          ? likedMovies.map((movie) => <Movie movie={movie} key={nanoid()} />)
          : null}
      </div>
    </div>
  );
};

export default page;
