import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: never) => {
  return twMerge(clsx(inputs));
};
