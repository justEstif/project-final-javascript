"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import firebase from "@/lib/firebase";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import useStore from "@/lib/store";
import { useRouter } from "next/navigation";

type Props = {};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TForm = z.infer<typeof formSchema>;

const Page = ({}: Props) => {
  const router = useRouter();
  const { signInUser, user } = useStore((state) => state);
  if (user) router.push("/");

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<TForm>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        firebase.auth,
        data.email,
        data.password
      );

      const usersRef = collection(firebase.db, "users");
      await addDoc(usersRef, { email: user.email });
      signInUser({
        id: user.uid,
        docId: usersRef.id,
        ...(user.email && { email: user.email }),
      });
      router.push("/");
    } catch (err) {
      const typedError = err as AuthError;
      setError("password", {
        message: typedError.code,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-12 m-3 bg-black/70"
    >
      <h1 className="mb-12 text-3xl font-semibold tracking-wider text-white">
        Sign Up
      </h1>

      <div className="mb-12">
        <input
          {...register("email")}
          placeholder="Email Address"
          className="py-4 px-5 w-full text-gray-200 border-orange-500 duration-300 focus:border-b-4 focus:outline-none bg-gray-400/40"
        />
        {errors.email?.message && (
          <p className="text-red-600">{errors.email?.message}</p>
        )}
      </div>
      <div className="mb-12">
        <input
          {...register("password")}
          placeholder="Password"
          className="py-4 px-5 w-full text-gray-200 border-orange-500 duration-300 focus:border-b-4 focus:outline-none bg-gray-400/40"
        />
        {errors.password?.message && (
          <p className="text-red-600">{errors.password?.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <button
          type="submit"
          className="py-2 mb-3 w-full text-lg font-semibold text-white bg-red-600 hover:bg-red-700"
        >
          Sign In
        </button>
        <p className="py-2 w-full text-center text-gray-400">
          {"Already a member? "}
          <Link className="text-white" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Page;
