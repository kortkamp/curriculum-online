import Link from 'next/link';
import { ReactNode } from 'react';
import Text from './Text';

interface PersonalData {
  name: string
  value: string
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
          <PersonalItem key={item.name}>
            <Text variant="light">{item.name}</Text>
            {/* <Link href={item.value}> */}
            <Text variant="standard">{item.value?.split('//')[1]}</Text>
            {/* </Link> */}
          </PersonalItem>
        ))
      }
    </ul>
  );
}

export default Personal;
