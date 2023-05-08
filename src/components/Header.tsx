import Contact, { ContactData } from './Contact';
import SafeArea from './SafeArea';

export interface HeaderData {
  name: string
  title: string
  contactData: ContactData
}

interface Props {
  data:HeaderData
}

function Header({ data }:Props) {
  return (
    <header className="bg-slate-700 text-gray-200">
      <SafeArea className="py-10">
        <div className="text-4xl">
          <h1 className="font-medium">
            {data.name}
          </h1>
        </div>
        <div className="font-medium text-gray-400 mb-6">
          <h3>
            {data.title}
          </h3>
        </div>
        <Contact data={data.contactData} />
      </SafeArea>
    </header>

  );
}

export default Header;
