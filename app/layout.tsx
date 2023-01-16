import "./styles.css";
interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <html lang="en" className="bg-black text-gray-50">
      <head />
      <body>{children}</body>
    </html>
  );
};

export default Layout;
