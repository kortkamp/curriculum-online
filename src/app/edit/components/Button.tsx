import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon?: ReactNode
}

function Button({
  type, children, icon, className, ...restOfProps
}: Props) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={
        clsx(
          'flex items-center gap-1 px-2 py-2 border rounded border-stone-300 hover:bg-primary-light transition-colors text-light',
          className,
        )
}
      {...restOfProps}
    >
      {icon}
      {children
        && (
        <span className="font-semibold ">
          {children}
        </span>
        )}
    </button>
  );
}

export default Button;
