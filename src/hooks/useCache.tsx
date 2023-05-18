import buildPDF from '@/api/buildCurriculum';
import ICurriculum from '@/types/ICurriculum';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  timeout?:number
  callback?: (a: any) => any
}
const useCache = ({ timeout = 2000 }:Props) => {
  const [curriculumData, setCurriculumData] = useState<ICurriculum>();

  const [data, setData] = useState('');

  const memoData = useMemo(() => curriculumData, [curriculumData]);

  const updateRequest = (curriculum: ICurriculum) => setCurriculumData(curriculum);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!memoData) return;
      setData(buildPDF(memoData));
      console.log('timeout fired!');
    }, timeout);
    return () => clearTimeout(timer);
  }, [memoData, timeout]);

  return { data, updateRequest };
};

export default useCache;
