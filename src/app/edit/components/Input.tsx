import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  md?: number
  lg?: number
  asChild? : boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label, className, width, name, md, asChild, ...props
  }, forwardedRed) => {
    const Comp = asChild ? Slot : 'input';
    return (
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
        <span className="py-1 px-2 text-light">{label}</span>
        <Comp
          name={name}
          {...props}
          className={
          clsx(
            'bg-background-medium text-lg text-medium rounded-md py-1 px-2 w-full focus:bg-primary-light ring-primary outline-primary transition-colors',
            className,
          )
        }
          ref={forwardedRed}
        />
      </label>
    );
  },
);

export default Input;
