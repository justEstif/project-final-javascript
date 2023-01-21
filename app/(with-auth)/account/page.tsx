import NavBar from "@/components/NavBar";
import LikedMovies from "@/components/LikedMovies";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className="container mx-auto min-h-screen">
      <NavBar />
      <LikedMovies />
    </div>
  );
};

export default Page;
