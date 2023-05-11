import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { Pencil1Icon } from '@radix-ui/react-icons';

import Button from './Button';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // type: 'button' | 'submit' | 'reset' | undefined
}

function EditButton({ ...props }: Props) {
  return (
    <Button {...props} icon={<Pencil1Icon height={20} width={20} />} />
  );
}

export default EditButton;
