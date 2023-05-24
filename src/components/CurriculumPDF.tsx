import buildPDF from '@/api/buildCurriculum';
import useCache from '@/hooks/useCache';
import ICurriculum from '@/types/ICurriculum';
import { useEffect, useState } from 'react';
import jsPDF, { jsPDF as JsPDF } from 'jspdf';

interface Props {
  curriculum: ICurriculum
}

function CurriculumPDF({ curriculum }:Props) {
  const { resultData, updateRequest } = useCache(buildPDF);

  const [font, setFont] = useState('arial');

  const pdf = new JsPDF('p', 'mm');

  // console.log('getStringUnitWidth ', pdf.getStringUnitWidth('asd', { font: 'helvetica' }));

  useEffect(() => {
    updateRequest(curriculum, font);
  }, [curriculum, updateRequest]);

  // const data2 = buildPDF(curriculum);
  return (
    <div className="h-full">
      {/* <select name="" id="" value={font} onChange={(e) => setFont(e.target.value)}>

        {Object.keys(pdf.getFontList()).map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}

      </select> */}
      <iframe
        title="Currículo"
        className="pdfobject"
        src={resultData && `data:application/pdf; filename=generated.pdf; base64,${window.btoa(resultData)}#zoom=fit`}
        style={{
          overflow: 'auto', width: '100%', height: '100%',
        }}
      />
    </div>
  );
}

export default CurriculumPDF;
