import Container from "../Container/Container";

interface HeroHeaderProps {
  title: string;
  text: string;
}

const Header = ({ title, text }: HeroHeaderProps) => {
  return (
    <div className="relative h-[400px] w-full mb-4">
      <img
        src="https://images.unsplash.com/photo-1499063078284-f78f7d89616a?w=1900&q=90"
        alt="Header"
        className="object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-schiphol-blue/80 to-transparent" />

      <div className="absolute top-10 left-0 w-full text-white z-10">
        <Container>
          <h1 className="text-4xl font-bold font-neue-frutiger">{title}</h1>
          <p className="mt-2 text-lg font-neue-frutiger">{text}</p>
        </Container>
      </div>
    </div>
  );
};

export default Header;
