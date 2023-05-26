import ICurriculum from '@/types/ICurriculum';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

const buildPDF = (curriculum: ICurriculum):Promise<string> => {
  const docDefinition:TDocumentDefinitions = {
    header: (currentPage, pageCount, pageSize) => [
      { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
      {
        canvas: [{
          type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40,
        }],
      },
    ],
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

  return new Promise((resolve) => {
    pdfDocGenerator.getDataUrl((data) => {
      resolve(data);
    });
  });
};

export default buildPDF;
