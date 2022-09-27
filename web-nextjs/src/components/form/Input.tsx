import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: InputHTMLAttributes<HTMLInputElement>;
}

export function Input({ register, ...rest }: InputProps) {
  return (
    <input
      type="text"
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
      {...register}
      {...rest}
    />
  );
}
