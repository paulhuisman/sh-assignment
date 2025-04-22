import { cn } from "~/util/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  const baseClasses = cn(
    "container mx-auto px-4 py-10 md:px-24 lg:px-40 md:py-16 xl:px-22 xl2:px-2",
    className
  );

  return <section className={baseClasses}>{children}</section>;
};

export default Container;
