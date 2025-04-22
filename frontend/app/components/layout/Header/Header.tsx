import Container from "../Container/Container";

interface HeroHeaderProps {
  title: string;
  text: string;
}

const Header = ({ title, text }: HeroHeaderProps) => {
  return (
    <div className="relative h-[250px] lg:h-[400px] w-full mb-4">
      <img
        src="assets/header.jpg"
        alt=""
        className="object-cover w-full h-full transition-all ease-in"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-schiphol-blue/80 to-transparent" />

      <div className="absolute top-4 lg:top-10 left-0 w-full text-white z-10">
        <Container>
          <h1 className="text-3xl lg:text-4xl font-bold font-neue-frutiger ">{title}</h1>
          <p className="lg:mt-2 text-base lg:text-lg font-neue-frutiger">{text}</p>
        </Container>
      </div>
    </div>
  );
};

export default Header;
