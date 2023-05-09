import Contact from './Contact';
import SafeArea from './SafeArea';

export interface HeaderData {
  name: string
  title: string
  mail:string
  phone: string
  location?: string
  locationLink?: string
}

interface Props {
  data:HeaderData
}

function Header({ data }:Props) {
  const {
    mail, location, name, phone, title, locationLink,
  } = data;
  return (
    <header className="bg-slate-700 text-gray-200">
      <SafeArea className="py-10">
        <div className="text-4xl">
          <h1 className="font-medium">
            {name}
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
