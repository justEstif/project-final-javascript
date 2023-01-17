import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-fixed bg-center bg-no-repeat bg-cover bg-netflix-background">
      <header className="container flex sticky top-0 justify-start py-4 mx-auto mb-24 text-white">
        <button className="text-4xl font-semibold tracking-tighter text-red-700 uppercase font-bebas">
          <Link href="/">Netflix</Link>
        </button>
      </header>
      <main className="container mx-auto max-w-md">{children}</main>
    </div>
  );
};

export default layout;
