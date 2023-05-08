import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children?: ReactNode
  variant?: 'subtitle' | 'title' | 'standard' | 'light'
  className?:string
}

function Text({ children, variant = 'standard', className }:Props) {
  return (
    <span className={
        clsx(
          'font-normal',
          { 'text-2xl': variant === 'title' },
          { 'font-semibold': variant === 'subtitle' },
          { 'font-normal text-sm': variant === 'standard' },
          { 'text-slate-400': variant === 'light' },
          className,
        )
      }
    >
      {children}
    </span>
  );
}

export default Text;
