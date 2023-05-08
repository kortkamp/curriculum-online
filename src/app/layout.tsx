import './globals.css';
import { Poppins } from 'next/font/google';
import { CurriculumContextProvider } from '@/context/curriculum.context';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata = {
  title: 'Curriculum',
  description: 'Printable Curriculum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CurriculumContextProvider>
          {children}
        </CurriculumContextProvider>
      </body>
    </html>
  );
}
