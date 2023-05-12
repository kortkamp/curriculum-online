import { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Text from './Text';

interface Props {
  title: string
  children?: ReactNode
  variant?: 'standard' | 'aside'
  className?: string
  notifyHeight? : (height: number)=> void
}

function Section({
  title, children, variant = 'standard', className, notifyHeight,
}:Props) {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const height = ref.current?.offsetHeight;
    if (height && notifyHeight) {
      notifyHeight(height);
    }
  });
  return (
    <section className="flex flex-col" ref={ref}>
      <header className={
        clsx(
          'flex w-full pb-5 gap-4',
          { 'items-center': variant === 'standard' },
          className,
        )
      }
      >
        <Text variant="title" className="whitespace-nowrap">
          {title}
        </Text>
      </header>
      <article className="flex flex-col gap-5">{children}</article>
    </section>
  );
}

export default Section;
