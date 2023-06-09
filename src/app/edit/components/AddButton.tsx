import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';

import Button from './Button';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // type: 'button' | 'submit' | 'reset' | undefined
}

function AddButton({ ...props }: Props) {
  return (
    <Button {...props} icon={<PlusIcon />} />
  );
}

export default AddButton;
