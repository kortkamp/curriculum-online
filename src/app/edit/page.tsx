import Curriculum from '@/components/Curriculum';

import { curriculum } from '../page';

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-scroll">
        {/* <Curriculum data={curriculum} /> */}
      </div>
      <div className="scale-50 flex-1">
        <Curriculum data={curriculum} />
      </div>
    </div>
  );
}
