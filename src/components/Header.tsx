import Contact from './Contact';
import SafeArea from './SafeArea';

function Header() {
  return (
    <header className="bg-slate-700 text-gray-200">
      <SafeArea className="py-10">
        <div className="text-4xl">
          <h1 className="font-medium">
            Marcelo Teixeira
          </h1>
        </div>
        <div className="font-medium text-gray-400 mb-6">
          <h3>
            Desenvolvedor Fullstack
          </h3>
        </div>
        <Contact />
      </SafeArea>
    </header>

  );
}

export default Header;
