import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // type: 'button' | 'submit' | 'reset' | undefined
  icon?: ReactNode
}

function Button({
  type, children, icon, ...restOfProps
}: Props) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className="flex items-center gap-1 px-2 py-2 border rounded border-stone-300 hover:bg-primary-light transition-colors"
      {...restOfProps}
    >
      {icon}
      <span className="text-light font-semibold ">
        {children}
      </span>
    </button>
  );
}

export default Button;
