import React, { ReactNode } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface Props {
  children: ReactNode
}

interface ItemProps {
  children: ReactNode
  value: string
  className?:string
}

export function AppAccordionItem({ children, value, className }: ItemProps) {
  return (
    <Accordion.Item
      className="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]"
      value={value}
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger
          className="text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[70px] flex-1 cursor-default items-center justify-between bg-white px-5 text-lg font-semibold leading-none shadow-[0_1px_0] outline-none"
        >
          {value}
          <ChevronDownIcon
            className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
            width={30}
            height={30}
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        className="text-mauve11 bg-background-light data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
      >
        <div className={clsx('py-[15px] px-5', className)}>{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

function AppAccordion({ children }: Props) {
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

export default AppAccordion;
