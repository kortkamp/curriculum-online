import ICurriculum from '@/types/ICurriculum';
import jsPDF, { jsPDF as JsPDF } from 'jspdf';

import '../assets/Poppins-Regular-normal';
import '../assets/Poppins-Medium-normal';

const pagePadding = {
  x: 10,
  y: 10,
};

const colorSchema = {
  primary: '#2c3544',
  neutral: {
    DEFAULT: 'white',
  },
  text: {
    contrast: {
      default: 'white',
      light: '#9599a2',
    },
  },
  background: {
    primary: '#2c3544',
  },
};

interface ICoordinate {
  x: number,
  y: number
}
interface IDimension {
  w: number,
  h: number
}
interface IFrameworkOptions {
  cursor?: ICoordinate
  margin?: ICoordinate
  page?: IDimension
}
class Framework {
  public cursor:ICoordinate;

  public margin: ICoordinate;

  public pageDimensions: IDimension;

  public page = 1;

  private pdf: jsPDF;

  constructor(
    pdf: jsPDF,
    {
      cursor = { x: 0, y: 0 },
      margin = { x: 10, y: 10 },
      page = { h: 297, w: 210 },
    }:IFrameworkOptions,
  ) {
    this.pdf = pdf;
    this.cursor = cursor;
    this.margin = margin;
    this.pageDimensions = page;
  }

  write() {
    this.cursor.x += 10;
  }
}

const buildPDF = (curriculum: ICurriculum) => {
  const pdf = new JsPDF('p', 'mm');

  const document = new Framework(pdf, {});

  // header
  pdf.setDrawColor(colorSchema.background.primary);
  pdf.setFillColor(colorSchema.background.primary);
  pdf.rect(0, 0, 210, 42, 'F');

  pdf.setFontSize(24);
  pdf.setTextColor(colorSchema.neutral.DEFAULT);
  pdf.setFont('Poppins-Medium');
  pdf.text(`${curriculum.personal?.name} ${curriculum.personal?.surname}` || '', pagePadding.x, pagePadding.y, { maxWidth: 300, baseline: 'top' });

  pdf.addPage();
  pdf.setPage(1);
  pdf.setTextColor(colorSchema.text.contrast.light);
  pdf.setFontSize(12);
  pdf.setFont('Poppins-Regular');

  pdf.text(`${curriculum.personal?.title}` || '', pagePadding.x, pagePadding.y + 10, { maxWidth: 300, baseline: 'top' });

  return pdf.output();
};

export default buildPDF;
