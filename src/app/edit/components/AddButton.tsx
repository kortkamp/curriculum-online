import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // type: 'button' | 'submit' | 'reset' | undefined
}

function AddButton({ type, children, ...restOfProps }: Props) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className="flex items-center gap-1 px-2 py-2 border rounded border-stone-300"
      {...restOfProps}
    >
      <PlusIcon height={20} width={20} className="text-medium" />
      <span className="text-light font-semibold ">
        {children}
      </span>
    </button>
  );
}

export default AddButton;
