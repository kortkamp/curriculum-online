import Link from 'next/link';
import { ReactNode } from 'react';
import Text from './Text';

export interface PersonalData {
  type: string
  url: string
}

interface Props {
  data: PersonalData[]
}

function PersonalItem({ children }:{ children: ReactNode }) {
  return (
    <li className="flex flex-col">
      {children}
    </li>
  );
}

function Personal({ data }:Props) {
  return (
    <ul className="flex flex-col gap-3">
      {
        data.map((item) => (
          <PersonalItem key={item.type}>
            <Text variant="light">{item.type}</Text>
            <Link href={item.url}>
              <Text variant="standard">{item.url.split('//')[1]}</Text>
            </Link>
          </PersonalItem>
        ))
      }
    </ul>
  );
}

export default Personal;
