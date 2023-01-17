"use client";
import useStore from "@/lib/store";
import { useRouter } from "next/navigation";

type Props = {};

const SignOutBtn = ({}: Props) => {
  const { signOutUser } = useStore((state) => state);
  const router = useRouter();

  const handleClick = () => {
    signOutUser();
    router.push("/sign-in");
  };

  return (
    <button
      className="py-2 px-4 text-lg hover:text-gray-600"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
