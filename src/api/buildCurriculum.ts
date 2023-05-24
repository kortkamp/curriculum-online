import ICurriculum from '@/types/ICurriculum';
import jsPDF, { jsPDF as JsPDF } from 'jspdf';
import { text } from 'stream/consumers';

import '../assets/Poppins-Regular-normal';
// import '../assets/Poppins-Medium-normal';

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

const MINIMUM_VALUE_TO_PREVENT_LINE_BREAK_BUG = 0.01;

const defaultFont = {
  color: 'black', size: 16, family: 'poppins', weight: 'normal',
};

const defaultPadding = { x: 10, y: 10 };

const pageDimensions = { h: 297, w: 210 };

interface ICoordinate {
  x: number,
  y: number
}
interface IDimension {
  w: number,
  h: number
}

type Direction = 'v' | 'h';
type Justify = 'start' | 'end' | 'center' | 'between';
type Align = 'start' | 'middle' | 'end';
interface IFrameworkOptions {
  name: string
  position?: ICoordinate
  bgColor?: string
  cursor?: ICoordinate
  margin?: ICoordinate
  padding?: ICoordinate
  page?: IDimension
  font?: Partial<IFont>
  height?: number
  maxHeight?: number
  maxWidth?: number
  width?:number
  fullWidth?: boolean
  direction?: Direction
  justify?: Justify
  align?: Align
  gap?: number
  children?: IFrameworkOptions[]
  text?:string
}
interface IFont {
  size: number,
  color: string,
  family: string,
  weight: string
}
interface IWriteOptions {
  font?: Partial<IFont>
}
class Framework {
  public bgColor : string | undefined;

  public name: string;

  public cursor:ICoordinate;

  public margin: ICoordinate;

  public padding: ICoordinate;

  // public pageDimensions: IDimension;

  private position: ICoordinate;

  public lineSpacing: number;

  public wordSpacing: number;

  public direction: Direction;

  public justify: Justify;

  public gap: number;

  public align: Align;

  public currentPage = 1;

  public font: IFont;

  public height: number = 0;

  public width: number = 0;

  public maxHeight: number;

  public maxWidth: number;

  public fullWidth: boolean;

  public children:Framework[] = [];

  public text: string | undefined;

  private pdf: jsPDF;

  constructor(
    // when construction the node we need to fallow these steps
    /**
     * 1 - define the dimensions , H and W
     *  1.1 - verify if parent we have these properties provided as props
     *  1.2 - calculate these values based on content
     *
     * 2 - draw background
     * 3 - insert render children
     */
    pdf: jsPDF,
    {
      name = '',
      position = { x: 0, y: 0 },
      cursor = { x: 0, y: 0 },
      margin = { x: 0, y: 0 },
      direction = 'v',
      justify = 'start',
      align = 'start',
      gap = 0,
      bgColor,
      page = { h: 297, w: 210 },
      font,
      height,
      width,
      maxHeight,
      maxWidth,
      fullWidth = false,
      children,
      padding = { x: 0, y: 0 },
      text,
    }:IFrameworkOptions,
  ) {
    // console.log(position);
    this.pdf = pdf;

    this.name = name;

    this.position = position;
    this.cursor = cursor;
    this.margin = margin;
    this.padding = padding;

    this.direction = direction;
    this.justify = justify;
    this.align = align;
    this.gap = gap;

    this.lineSpacing = 1;
    this.wordSpacing = 1;

    this.font = {
      color: font?.color || defaultFont.color,
      size: font?.size || defaultFont.size,
      family: font?.family || defaultFont.family,
      weight: font?.weight || defaultFont.weight,
    };

    this.bgColor = bgColor;

    this.text = text;

    this.maxHeight = maxHeight || height || 99999;
    this.maxWidth = maxWidth || width || 99999;

    this.fullWidth = fullWidth;

    this.height = height || 0;
    this.width = width || maxWidth;
    this.buildChildren(children);

    const contentDimensions = this.getContentDimensions();

    this.height = height || contentDimensions.h;
    this.width = fullWidth ? this.maxWidth : (width || contentDimensions.w);
  }

  render() {
    this.setBackgroundStyle();
    this.setFont();
    if (this.text) {
      this.write();
    }
    if (this.children.length) {
      this.children.forEach((child) => { child.render(); });
    }
  }

  setBackgroundStyle() {
    if (!this.bgColor) return;
    this.pdf.setDrawColor(this.bgColor);
    this.pdf.setFillColor(this.bgColor);
    this.pdf.rect(
      this.position.x + this.margin.x,
      this.position.y + this.margin.y,
      this.width - 2 * this.margin.x,
      this.height - 2 * this.margin.y,
      'F',
    );
  }

  setFont() {
    this.pdf.setFontSize(this.font.size);
    this.pdf.setTextColor(this.font.color);
    this.pdf.setFont(this.font.family, this.font.weight);
  }

  page(index: number) {
    this.currentPage = index;
    this.pdf.setPage(index);
    return this;
  }

  addPosition(value:ICoordinate) {
    const { x, y } = this.position;
    this.position = { x: x + value.x, y: y + value.y };
  }

  getTextDimension():IDimension {
    if (!this.text) {
      return { w: 0, h: 0 };
    }
    this.setFont();
    const textDimensions = this.pdf.getTextDimensions(this.text, {
      // font: this.pdf.getFont().fontName,
      fontSize: this.font.size,
      maxWidth: (this.maxWidth) - this.cursor.x - 2 * this.margin.x - 2 * this.padding.x,
    });

    return textDimensions;
  }

  calculateChildrenTotalDimensions():IDimension {
    let totalDimensions;
    if (this.direction === 'h') {
      // horizontal
      totalDimensions = this.children.reduce(
        (total, child) => ({
          w: total.w + child.width,
          h: child.height > total.h ? child.height : total.h,
        }),
        { w: 0, h: 0 },
      );
      return totalDimensions;
    }

    totalDimensions = this.children.reduce(
      (total, child) => ({
        h: total.h + child.height,
        w: child.width > total.w ? child.width : total.w,
      }),
      { w: 0, h: 0 },
    );
    return totalDimensions;
  }

  getContentDimensions():IDimension {
    let contentDimensions = { w: 0, h: 0 };
    if (this.text) {
      contentDimensions = this.getTextDimension();
    }
    if (this.children.length) {
      contentDimensions = this.calculateChildrenTotalDimensions();
      const totalGapSpaces = this.children.length - 1;
      const totalVerticalGap = this.direction === 'v' ? totalGapSpaces * this.gap : 0;
      const totalHorizontalGap = this.direction === 'h' ? totalGapSpaces * this.gap : 0;
      contentDimensions.h += totalVerticalGap;
      contentDimensions.w += totalHorizontalGap;
    }
    const dimensions = {
      w: 2 * this.margin.x + 2 * this.padding.x + contentDimensions.w,
      h: 2 * this.margin.y + 2 * this.padding.y + contentDimensions.h,
    };
    return dimensions;
  }

  addChild(childData: IFrameworkOptions) {
    // console.log(childData);
    // const foundChild = this.children.find((existentChild) => existentChild.name === childData.name);
    // if (foundChild) {
    //   throw new Error('Child name already exists');
    // }

    const child = new Framework(
      this.pdf,
      {
        ...childData,
        position: {
          x: this.position.x + this.cursor.x + this.margin.x + this.padding.x,
          y: this.position.y + this.cursor.y + this.margin.y + this.padding.y,
        },
        font: {
          family: childData.font?.family || this.font.family,
          size: childData.font?.size || this.font.size,
          color: childData.font?.color || this.font.color,
          weight: childData.font?.weight || this.font.weight,
        },
      },
    );
    this.children.push(child);

    if (this.direction === 'v') {
      this.cursor.y += child.height || 0;
    } else {
      this.cursor.x += child.width || 0;
    }
    // console.log('new cursor ', this.cursor);
  }

  buildChildren(childrenData:IFrameworkOptions[] | undefined) {
    if (!childrenData) {
      return;
    }

    let parentWidth = (this.width || this.maxWidth) - 2 * this.margin.x - 2 * this.padding.x;

    let parentHeight = this.height ? this.height - 2 * this.margin.y - 2 * this.padding.y : 0;

    childrenData.forEach((childData) => {
      this.addChild({ ...childData, maxWidth: childData.maxWidth || parentWidth });
    });

    const numberOfGaps = childrenData.length - 1;

    let justifyStartValue = 0;
    let justifyBetweenValue = this.gap;
    let justifyEndValue = 0;

    let justifyFreeSpace = 0;

    let alignStartValue = 0;
    let alignChildFactor = 1;
    let alignTotalSpace = 0;

    let childrenWidth;
    let childrenHeight;

    if (this.direction === 'h') {
      // horizontal
      childrenWidth = this.children.reduce((totalWidth, child) => (totalWidth + child.width), 0);
      childrenHeight = this.children.reduce((tallerChild, child) => (
        child.height > tallerChild ? child.height : tallerChild), 0);

      parentWidth = parentWidth || childrenWidth;
      parentHeight = parentHeight || childrenHeight;
      justifyFreeSpace = parentWidth - childrenWidth - numberOfGaps * this.gap;
      alignTotalSpace = parentHeight || childrenHeight;
    } else {
      // vertical
      childrenWidth = this.children.reduce((widerChild, child) => (
        child.width > widerChild ? child.width : widerChild), 0);
      childrenHeight = this.children.reduce(
        (totalHeight, child) => (totalHeight + child.height),
        0,
      );
      parentWidth = parentWidth || childrenWidth;
      parentHeight = parentHeight || childrenHeight;
      justifyFreeSpace = parentHeight - childrenHeight - numberOfGaps * this.gap;
      alignTotalSpace = parentWidth;
    }

    switch (this.align) {
      case 'start':
        alignStartValue = 0;
        alignChildFactor = 0;
        break;
      case 'middle':
        alignStartValue = alignTotalSpace / 2;
        alignChildFactor = 0.5;

        break;
      case 'end':
        alignStartValue = alignTotalSpace;
        alignChildFactor = 1;
        break;
      default:
        break;
    }

    switch (this.justify) {
      case 'start':
        justifyStartValue = 0;
        break;
      case 'center':
        justifyStartValue = justifyFreeSpace / 2;
        justifyEndValue = justifyStartValue;
        break;
      case 'end':
        justifyStartValue = justifyFreeSpace;
        break;
      case 'between':
        justifyBetweenValue = justifyFreeSpace / (this.children.length - 1);
        break;
      default:
        break;
    }

    if (this.direction === 'h') {
      this.children.forEach((child, index) => {
        child.position.x += (justifyStartValue + index * justifyBetweenValue);
        child.position.y += alignStartValue - alignChildFactor * child.height;
      });
    } else {
      this.children.forEach((child, index) => {
        child.position.y += (justifyStartValue + index * justifyBetweenValue);
        child.position.x += alignStartValue - alignChildFactor * child.width;
      });
    }

    // /aqui devemos calcular um vetor de acordo com a orientaçao do parent

    const remainingWidth = parentWidth - childrenWidth;

    // apply fullWidth
    const fullWidthChild = this.children.find(
      (child) => child.fullWidth,
    );

    if (fullWidthChild) {
      fullWidthChild.width += remainingWidth;
    }
  }

  getChild(name: string) {
    const foundChild = this.children.find((child) => child.name === name);
    if (!foundChild) {
      throw new Error('Child not found');
    }
    return foundChild;
  }

  // recursively search subnodes
  findNode(name: string) {
    let foundNode = this.children.find((child) => child.name === name);

    if (foundNode) {
      return foundNode;
    }
    this.children.forEach((child) => {
      const subNodeFound = child.findNode(name);
      if (subNodeFound) {
        foundNode = subNodeFound;
      }
    });

    return foundNode;
  }

  write() {
    if (!this.text) {
      return;
    }
    const textDimensions = this.getTextDimension();

    const writableBottomLimit = this.height - 2 * this.margin.y;

    if (this.cursor.y + textDimensions.h > writableBottomLimit) {
      const totalPages = this.pdf.getNumberOfPages();

      // we are in the last page
      if (this.currentPage === totalPages) {
        this.pdf.addPage();
      }

      this.currentPage += 1;
      this.cursor.y = 0;
    }

    this.pdf.setPage(this.currentPage);

    this.pdf.text(
      this.text,
      this.cursor.x + this.margin.x + this.position.x + this.padding.x,
      this.cursor.y + this.margin.y + this.position.y + this.padding.y,
      {
        baseline: 'top',
        maxWidth:
         this.width
         - this.cursor.x
         - 2 * this.margin.x
         - 2 * this.padding.x
         + MINIMUM_VALUE_TO_PREVENT_LINE_BREAK_BUG,
      },
    );

    if (this.direction === 'v') {
      this.cursor.y += this.lineSpacing + textDimensions.h;
    } else {
      this.cursor.x += this.wordSpacing + textDimensions.w;
    }
  }
}

const buildPDF = (curriculum: ICurriculum, font = '') => {
  const contentItem = (
    title:string,
    sub:string,
    content:string = '',
    aside:string = '',
  ) => {
    const result:IFrameworkOptions = {
      name: title,
      font: { size: 10 },
      gap: 2,
      fullWidth: true,
      children: [
        {
          name: 'header',
          justify: 'between',
          direction: 'h',
          children: [
            {
              name: 'title',
              text: title || '[title]',
              // bold
            },
            {
              name: 'aside',
              text: aside || '[aside]',
            },
          ],
        },
        {
          name: 'sub',
          font: { color: '#8f8f8f' },
          text: sub || '[sub]',
        },
        {
          name: 'content',
          text: content || '[content]',
        },
      ],
    };

    return result;
  };

  const education = curriculum.education.map((item) => contentItem(item.title, `${item.origin} ${item.city}`, item.description));

  const data: IFrameworkOptions = {
    height: pageDimensions.h,
    width: pageDimensions.w,
    name: 'body',
    direction: 'v',
    children: [
      {
        name: 'header',
        bgColor: colorSchema.primary,
        padding: { x: 10, y: 10 },
        fullWidth: true,
        font: { family: font, weight: 'normal', color: colorSchema.text.contrast.default },
        children: [
          {
            name: 'name',
            text: 'Marcelo Teixeira',
            font: { size: 30, weight: 'normal' },
          },
          {
            name: 'title',
            text: 'Desenvolvedor FullStack',
            font: { size: 14, color: colorSchema.text.contrast.light },
            margin: { x: 0, y: 3 },
          },
          {
            name: 'divider',
            margin: { x: 0, y: 2 },
          },
          {
            name: 'links',
            direction: 'h',
            justify: 'between',
            font: { size: 12, color: colorSchema.text.contrast.light },
            children: [
              {
                name: 'mail',
                text: 'marcelusmedius@gmail.com',
              },
              {
                name: 'phone',
                text: '(22) 99708-8801',
              },
              {
                name: 'address',
                text: 'Aperibé - RJ',
              },
            ],
          },
        ],
      },
      {
        name: 'main',
        direction: 'h',
        margin: { x: 10, y: 10 },
        fullWidth: true,
        justify: 'between',
        align: 'start',
        children: [
          {
            name: 'content',
            width: 120,
            margin: { x: 0, y: 0 },
            // bgColor: '#116699',
            // text: 'CONTENTa..',
            gap: 0,
            children: education,

          },
          {
            name: 'aside',
            width: 53,
            margin: { x: 0, y: 0 },
            bgColor: '#005544',
            text: 'ASIDE',
            fullWidth: false,
          },
        ],
      },
    ],
  };

  const pdf = new JsPDF('p', 'mm');

  const document = new Framework(pdf, data);

  document.render();

  return pdf.output();
};

export default buildPDF;
