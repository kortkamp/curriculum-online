import Link from 'next/link';
import { ReactNode } from 'react';
import Text from './Text';

interface ContactData {
  type: string
  label: string
  url: string
}

const personal: ContactData[] = [
  {
    type: 'Site',
    label: 'kortkamp.dev',
    url: 'https://kortkamp.dev',
  },
  {
    type: 'Github',
    label: 'github.com/kortkamp',
    url: 'https://github.com/kortkamp',
  },
  {
    type: 'Linkedin',
    label: 'linkedin.com/in/kortkamp',
    url: 'https://www.linkedin.com/in/kortkamp/',
  },
];

function PersonalItem({ children }:{ children: ReactNode }) {
  return (
    <li className="flex flex-col">
      {children}
    </li>
  );
}

function Personal() {
  return (
    <ul className="flex flex-col gap-3">
      {
        personal.map((item) => (
          <PersonalItem key={item.type}>
            <Text variant="light">{item.type}</Text>
            <Link href={item.url}>
              <Text variant="standard">{item.label}</Text>
            </Link>
          </PersonalItem>
        ))
      }
    </ul>
  );
}

export default Personal;
