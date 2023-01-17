"use client";
import useStore from "@/lib/store";
import { useRouter } from "next/navigation";
import Row from "@/components/Row";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import { requests } from "@/lib/tmdb";

type Props = {};

const Page = ({}: Props) => {
  const { user } = useStore((state) => state);
  const router = useRouter();
  if (!user) router.push("/sign-in");

  return (
    <div className="min-h-screen">
      <Hero>
        <NavBar />
      </Hero>
      <div className="container mx-auto">
        <Row title={"Popular"} fetchUrl={requests.requestPopular} />
        <Row title={"Top Rated"} fetchUrl={requests.requestTopRated} />
        <Row title={"Trending"} fetchUrl={requests.requestTrending} />
        <Row title={"Horror"} fetchUrl={requests.requestHorror} />
        <Row title={"Upcoming"} fetchUrl={requests.requestUpcoming} />
      </div>
    </div>
  );
};

export default Page;
