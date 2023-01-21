"use client";
import useStore from "@/lib/store";
import Link from "next/link";
import SignOutBtn from "./SignOutBtn";
type Props = {};

const NavBar = ({}: Props) => {
  const user = useStore((state) => state.user);

  return (
    <header className="container flex justify-between items-center py-4 mx-auto">
      <Link
        href="/"
        className="text-4xl font-semibold tracking-tighter text-red-700 uppercase font-bebas"
      >
        Netflix
      </Link>
      <div className="flex gap-4 justify-between items-center">
        {user ? (
          <>
            <Link href="/account" className="text-lg text-red-700">
              Account
            </Link>
            <SignOutBtn />
          </>
        ) : (
          <>
            <Link href="/sign-in" className="text-lg text-red-700">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-lg text-red-700">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
