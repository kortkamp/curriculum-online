// import buildPDF from '@/api/buildCurriculum';
import buildPDF from '@/api/buildCurriculum';
import useCache from '@/hooks/useCache';
import ICurriculum from '@/types/ICurriculum';
import {
  useEffect,
} from 'react';
// import buildPDF from '@/api/pdfMake';

interface Props {
  curriculum: ICurriculum
}

function CurriculumPDF({ curriculum }:Props) {
  const { resultData, updateRequest } = useCache(buildPDF);

  // console.log('render CurriculumPDF');

  // console.log(resultData)

  // console.log('getStringUnitWidth ', pdf.getStringUnitWidth('asd', { font: 'helvetica' }));
  // console.log('render');
  useEffect(() => {
    if (curriculum) {
      updateRequest(curriculum);
    }
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
        title="Currículo"
        className="pdfobject"
        src={`${resultData}#zoom=70%`}
        style={{
          overflow: 'auto', width: '100%', height: '100%',
        }}
      />
    </div>
  );
}

export default CurriculumPDF;
