import React, { ReactNode } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface Props {
  children: ReactNode
}



const AccordionTrigger = React.forwardRef(({ children, ...props }:Accordion.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className="text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none"
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef<HTMLDivElement>(({ children, ...props }, forwardedRef) => (
  <Accordion.Content
    className="text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));



export const AccordionItem = React.forwardRef(({ children, value, ...props }:Accordion.AccordionItemProps & React.RefAttributes<HTMLDivElement>, forwardedRef) => (
  <Accordion.Item
    className="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]"
    value={value}
    {...props}
    ref={forwardedRef}
  >
    <AccordionTrigger>{value}</AccordionTrigger>
    <AccordionContent>{children}</AccordionContent>
  </Accordion.Item>
));

function AccordionDemo({ children }:Props) {
  return (
    <Accordion.Root
      className="bg-mauve6 rounded-md shadow-[0_2px_10px] shadow-black/5"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {children}
    </Accordion.Root>
  );
}

export default AccordionDemo;
