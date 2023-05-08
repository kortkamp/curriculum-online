import Curriculum from '@/components/Curriculum';
import { curriculum } from '../page';

export default function Home() {
  return (
    <div className="">
      <div>123</div>
      <div className="scale-50 origin-top-left">
        <Curriculum data={curriculum} />
      </div>
    </div>
  );
}
