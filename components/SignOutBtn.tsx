"use client";
import useStore from "@/lib/store";
import firebase from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

type Props = {};

const SignOutBtn = ({}: Props) => {
  const { signOutUser } = useStore((state) => state);
  const router = useRouter();

  const handleClick = async () => {
    await signOut(firebase.auth);
    signOutUser();
    router.push("/sign-in");
  };

  return (
    <button
      className="py-2 px-4 text-lg hover:bg-gray-800"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
