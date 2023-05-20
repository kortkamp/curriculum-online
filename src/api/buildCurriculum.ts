import ICurriculum from '@/types/ICurriculum';
import jsPDF, { jsPDF as JsPDF } from 'jspdf';

import '../assets/Poppins-Regular-normal';
import '../assets/Poppins-Medium-normal';

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
  font?: IFont
}
interface IFont {
  size: number,
  color: string,
  family: string
}
interface IWriteOptions {
  font?: Partial<IFont>
}
class Framework {
  public cursor:ICoordinate;

  public margin: ICoordinate;

  public pageDimensions: IDimension;

  public lineSpacing: number;

  public wordSpacing: number;

  public direction: 'h' | 'v';

  public currentPage = 1;

  public defaultFont: IFont;

  public height: number;

  public width: number;

  public maxHeight: number;

  public maxWidth: number;

  private pdf: jsPDF;

  constructor(
    pdf: jsPDF,
    {
      cursor = { x: 0, y: 0 },
      margin = { x: 10, y: 10 },
      page = { h: 297, w: 210 },
      font = { color: 'black', size: 16, family: 'Arial' },
    }:IFrameworkOptions,
  ) {
    this.pdf = pdf;
    this.cursor = cursor;
    this.margin = margin;
    this.pageDimensions = page;
    this.direction = 'v';
    this.lineSpacing = 1;
    this.wordSpacing = 1;
    this.defaultFont = font;

    this.maxWidth = this.pageDimensions.w - 2 * this.margin.x;

    this.setFont(font);
  }

  setFont(font: IFont) {
    this.pdf.setFontSize(font.size);
    this.pdf.setTextColor(font.color);
    this.pdf.setFont(font.family);
  }

  page(index: number) {
    this.currentPage = index;
    this.pdf.setPage(index);
    return this;
  }

  write(text: string = '', options?: IWriteOptions) {
    const textDimensions = this.pdf.getTextDimensions(text, {
      font: options?.font?.family,
      fontSize: options?.font?.size,
      maxWidth: this.maxWidth - this.cursor.x,
    });

    const pageBottomLimit = this.pageDimensions.h - this.margin.y;

    if (this.cursor.y + textDimensions.h > pageBottomLimit) {
      const totalPages = this.pdf.getNumberOfPages();

      // we are in the last page
      if (this.currentPage === totalPages) {
        this.pdf.addPage();
      }

      this.currentPage += 1;
      this.cursor.y = 0;
    }

    this.pdf.text(
      text,
      this.cursor.x + this.margin.x,
      this.cursor.y + this.margin.y,
      { baseline: 'top', maxWidth: this.maxWidth - this.cursor.x },
    );
    this.pdf.rect(this.cursor.x + this.margin.x, this.cursor.y + this.margin.y, 1, 1, 'F');

    if (this.direction === 'v') {
      this.cursor.y += this.lineSpacing + textDimensions.h;
    } else {
      this.cursor.x += this.wordSpacing + textDimensions.w;
    }
  }
}

const buildPDF = (curriculum: ICurriculum) => {
  const pdf = new JsPDF('p', 'mm');

  const document = new Framework(pdf, {});

  pdf.addPage();

  // pdf.addPage();

  // header
  // pdf.setDrawColor(colorSchema.background.primary);
  // pdf.setFillColor(colorSchema.background.primary);
  // pdf.rect(0, 0, 210, 42, 'F');

  // pdf.setFontSize(24);
  // pdf.setTextColor(colorSchema.neutral.DEFAULT);
  // pdf.setFont('Poppins-Medium');

  // pdf.addPage();
  // pdf.setPage(1);
  // pdf.setTextColor(colorSchema.text.contrast.light);
  // pdf.setFontSize(12);
  // pdf.setFont('Poppins-Regular');
  const a = 'Desenvolvedor Fullstack lfksdjf lskjdfl ksjdfl kjsldfk jsldkfj sldk fjsld kfjs lkdfj slk Desenvolvedor Fullstack fsj dfjj oiu   uoiuoiu';
  // document.cursor = { x: 100, y: 0 };
  for (let i = 0; i < 40; i += 1) {
    document.write(`${i} - ${a}`);
  }
  document.write(`${curriculum.personal?.title}` || '');
  document.write(`${curriculum.personal?.title}` || '');
  document.write(`${curriculum.personal?.title}` || '');

  return pdf.output();
};

export default buildPDF;
