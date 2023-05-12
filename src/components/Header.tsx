import { IPersonalData } from '@/types/ICurriculum';
import { useRef } from 'react';
import Contact from './Contact';
import SafeArea from './SafeArea';

interface Props {
  data:IPersonalData
  notifyHeight? : (height: number)=> void
}

function Header({ data, notifyHeight }:Props) {
  const {
    mail, location, name, surname, phone, title, locationLink,
  } = data;

  const ref = useRef<null | HTMLHeadElement>(null);

  const height = ref.current?.offsetHeight;
  if (height && notifyHeight) {
    notifyHeight(height);
  }

  return (
    <header ref={ref} className="pb-10">
      <div className="bg-slate-700 text-gray-200">
        <SafeArea className="py-10">
          <div className="text-4xl">
            <h1 className="font-medium">
              {`${name} ${surname}`}
            </h1>
          </div>
          <div className="font-medium text-gray-400 mb-6">
            <h3>
              {title}
            </h3>
          </div>
          <Contact data={{
            mail, phone, location, locationLink,
          }}
          />
        </SafeArea>
      </div>
    </header>

  );
}

export default Header;
