import { IPersonalData } from '@/types/ICurriculum';
import Contact from './Contact';
import SafeArea from './SafeArea';

interface Props {
  data:IPersonalData
}

function Header({ data }:Props) {
  const {
    mail, location, name, surname, phone, title, locationLink,
  } = data;
  return (
    <header className="bg-slate-700 text-gray-200">
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
    </header>

  );
}

export default Header;
