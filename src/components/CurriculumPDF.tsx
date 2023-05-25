// import buildPDF from '@/api/buildCurriculum';
import useCache from '@/hooks/useCache';
import ICurriculum from '@/types/ICurriculum';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import jsPDF, { jsPDF as JsPDF } from 'jspdf';
import buildPDF from '@/api/pdfMake';

interface Props {
  curriculum: ICurriculum
}

function CurriculumPDF({ curriculum }:Props) {
  const ref = useRef<null | HTMLIFrameElement>(null);

  const myFunc = useCallback((aaa:ICurriculum) => buildPDF(ref)(aaa), [ref]);

  const { resultData, updateRequest } = useCache(myFunc);

  // console.log('getStringUnitWidth ', pdf.getStringUnitWidth('asd', { font: 'helvetica' }));
  // console.log('render');
  useEffect(() => {
    updateRequest(curriculum);
  }, [curriculum]);

  // const data2 = buildPDF(curriculum);
  return (
    <div className="h-full">
      {/* <select name="" id="" value={font} onChange={(e) => setFont(e.target.value)}>

        {Object.keys(pdf.getFontList()).map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}

      </select> */}
      <iframe
        ref={ref}
        title="Currículo"
        className="pdfobject"
        // src={resultData && `data:application/pdf; filename=generated.pdf; base64,${resultData}#zoom=fit`}
        style={{
          overflow: 'auto', width: '100%', height: '100%',
        }}
      />
    </div>
  );
}

export default CurriculumPDF;
