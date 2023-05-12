import clsx from 'clsx';
import { useRef } from 'react';

interface Props {
  variant?: 'horizontal' | 'vertical'
  className?:string
  notifyHeight? : (height: number)=> void
}

function Divider({ variant = 'horizontal', className, notifyHeight }:Props) {
  const ref = useRef<null | HTMLDivElement>(null);

  const height = ref.current?.offsetHeight;
  if (height && notifyHeight) {
    notifyHeight(height);
  }
  return (
    <div
      className={
        clsx(
          'border-gray-100',
          { 'border-t-2  py-6': variant === 'horizontal' },
          { 'border-l-2  mx-10': variant === 'vertical' },
          className,
        )
      }
      ref={ref}
    />
  );
}

export default Divider;
