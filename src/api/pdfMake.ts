import ICurriculum from '@/types/ICurriculum';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MutableRefObject } from 'react';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

const buildIframe = (curriculum: ICurriculum, ref: MutableRefObject<HTMLIFrameElement | null>) => {
  const docDefinition = {
    content: [
      curriculum.personal.name,
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'First column',
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: 'Second column',
          },
          {
            // fixed width
            width: 100,
            text: 'Third column',
          },
          {
            // % width
            width: '20%',
            text: 'Fourth column',
          },
        ],
        // optional space between columns
        columnGap: 10,
      },
      'This paragraph goes below all columns and has full width',
    ],
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  pdfDocGenerator.getDataUrl((data) => {
    if (ref.current) {
      ref.current.src = data;
    }
  });
};

const buildPDF = (ref: MutableRefObject<HTMLIFrameElement | null>) => (curriculum: ICurriculum) => buildIframe(curriculum, ref);

export default buildPDF;
