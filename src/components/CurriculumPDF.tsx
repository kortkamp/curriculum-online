import buildPDF from '@/api/buildCurriculum';
import useCache from '@/hooks/useCache';
import ICurriculum from '@/types/ICurriculum';
import { useEffect } from 'react';

import '../assets/Poppins-normal';

interface Props {
  curriculum: ICurriculum
}

function CurriculumPDF({ curriculum }:Props) {
  const { resultData, updateRequest } = useCache(buildPDF);

  useEffect(() => {
    updateRequest(curriculum);
  }, [curriculum, updateRequest]);

  // const data2 = buildPDF(curriculum);
  return (
    <div className="h-full">
      <embed
        className="pdfobject"
        src={resultData && `data:application/pdf; filename=generated.pdf; base64,${window.btoa(resultData)}`}
        type="application/pdf"
        style={{
          overflow: 'auto', width: '100%', height: '100%',
        }}
      />
    </div>
  );
}

export default CurriculumPDF;
