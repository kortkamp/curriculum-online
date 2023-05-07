import { ReactNode } from "react"
import clsx from 'clsx';
import Text from "./Text";

interface Props {
  title: string
  children?: ReactNode
  variant?: "standard" | "aside"
  className?: string
}

const Section = ({title, children, variant = "standard", className }:Props)=> {
  return(
    <section className="flex flex-col">
      <header className={
        clsx(
          'flex w-full pb-5 gap-4',
          { 'items-center': variant === 'standard' },
          className
        )
      }>
        <Text variant="title" className="whitespace-nowrap">
          {title}
        </Text>
      </header>
      <article className="flex flex-col gap-5">{children}</article>
    </section>
  )
}


export default Section