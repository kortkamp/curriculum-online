import clsx from 'clsx';

interface Props {
  variant?: 'horizontal' | 'vertical'
  className?:string
}

function Divider({ variant = 'horizontal', className }:Props) {
  return (
    <div className={
        clsx(
          'border-gray-100',
          { 'border-t-2  my-10': variant === 'horizontal' },
          { 'border-l-2  mx-10': variant === 'vertical' },
          className,
        )
      }
    />
  );
}

export default Divider;
