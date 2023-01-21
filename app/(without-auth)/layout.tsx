import NavBar from "@/components/NavBar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-fixed bg-center bg-no-repeat bg-cover bg-netflix-background">
      <NavBar />
      <main className="container mx-auto max-w-md">{children}</main>
    </div>
  );
};

export default layout;
