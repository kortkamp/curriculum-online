import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  md?: number
  lg?: number
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label, className, width, name, md, ...props
  }, forwardedRed) => (
    <label
      htmlFor={name}
      className={
        clsx(
          'flex flex-col',
          { 'md:w-2/12': md === 2 },
          { 'md:w-4/12': md === 4 },
          { 'md:w-6/12': md === 6 },
          { 'md:w-8/12': md === 8 },
          { 'md:w-10/12': md === 10 },

        )
      }
    >
      <span className="py-1 px-2">{label}</span>
      <input
        name={name}
        {...props}
        className={
          clsx(
            'bg-zinc-200 text-lg text-gray-800 rounded-md py-1 px-2 w-full',
            className,
          )
        }
        ref={forwardedRed}
      />
    </label>
  ),
);

export default Input;
