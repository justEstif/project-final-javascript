import Link from "next/link";
import SignOutBtn from "./SignOutBtn";
type Props = {};

const NavBar = ({ }: Props) => {
  return (
    <header className="container flex justify-between items-center py-4 mx-auto">
      <Link
        href="/"
        className="text-4xl font-semibold tracking-tighter text-red-700 uppercase font-bebas"
      >
        Netflix
      </Link>
      <div>
        <Link href="/account" className="text-lg text-red-700">
          Account
        </Link>
        <SignOutBtn />
      </div>
    </header>
  );
};

export default NavBar;
