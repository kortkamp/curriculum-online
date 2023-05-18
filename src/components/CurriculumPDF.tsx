import buildPDF from '@/api/buildCurriculum';
import useCache from '@/hooks/useCache';
import ICurriculum from '@/types/ICurriculum';
import { useEffect, useMemo } from 'react';

interface Props {
  curriculum: ICurriculum
}

function CurriculumPDF({ curriculum }:Props) {
  const { data, updateRequest } = useCache({});

  useEffect(() => {
    updateRequest(curriculum);
  }, [curriculum, updateRequest]);

  const data2 = buildPDF(curriculum);
  return (
    <div className="h-full">
      <embed
        className="pdfobject"
        src={`data:application/pdf; filename=generated.pdf; base64,${data}`}
        type="application/pdf"
        style={{
          overflow: 'auto', width: '100%', height: '100%',
        }}
      />
    </div>
  );
}

export default CurriculumPDF;
