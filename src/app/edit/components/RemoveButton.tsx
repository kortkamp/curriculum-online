import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { TrashIcon } from '@radix-ui/react-icons';

import Button from './Button';

interface Props extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // type: 'button' | 'submit' | 'reset' | undefined
}

function RemoveButton({ ...props }: Props) {
  return (
    <Button {...props} icon={<TrashIcon />} />
  );
}

export default RemoveButton;
