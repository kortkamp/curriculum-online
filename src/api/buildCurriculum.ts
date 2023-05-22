import ICurriculum from '@/types/ICurriculum';
import jsPDF, { jsPDF as JsPDF } from 'jspdf';

// import '../assets/Poppins-Regular-normal';
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

const DRAW_MARGIN = true;
const DRAW_PADDING = true;

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
interface IFrameworkOptions {
  name: string
  position?: ICoordinate
  bgColor?: string
  cursor?: ICoordinate
  margin?: ICoordinate
  padding?: ICoordinate
  page?: IDimension
  font?: IFont
  height?: number
  maxHeight?: number
  maxWidth?: number
  width?:number
  fullWidth?: boolean
  direction?: Direction
  justify?: Justify
  children?: IFrameworkOptions[]
  text?:string
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
      bgColor,
      page = { h: 297, w: 210 },
      font = { color: 'black', size: 16, family: 'helvetica' },
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

    this.lineSpacing = 1;
    this.wordSpacing = 1;
    this.font = font;
    this.bgColor = bgColor;

    this.text = text;

    this.maxHeight = maxHeight || height || 99999;
    this.maxWidth = maxWidth || width || 99999;

    this.fullWidth = fullWidth;

    console.log(`creating ${this.name} width ${this.width} height:${this.height} maxWidth:${this.maxWidth} `);

    this.buildChildren(children);

    const contentDimensions = this.getContentDimensions();

    console.log(`${this.name} contentDimensions ${JSON.stringify(contentDimensions)}`);

    this.height = height || contentDimensions.h;
    this.width = fullWidth ? this.maxWidth : (width || contentDimensions.w);

    // this.drawMargin();
    // this.drawPadding();
  }

  render() {
    this.setBackgroundStyle();
    this.setFont();
    if (this.text) {
      this.write(this.text);
    }
    if (this.children.length) {
      this.children.forEach((child) => { child.render(); });
    }
  }

  setBackgroundStyle() {
    if (!this.bgColor) return;
    console.log('setting bgColor');
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

  drawMargin() {
    if (!DRAW_MARGIN) return;
    const marginColor = '#ffaa22';
    this.pdf.setDrawColor(marginColor);
    this.pdf.setFillColor(marginColor);
    this.pdf.rect(this.position.x, this.position.y, this.width, this.height, 'F');

    this.pdf.setDrawColor(this.bgColor || 'white');
    this.pdf.setFillColor(this.bgColor || 'white');
    this.pdf.rect(
      this.position.x + this.margin.x,
      this.position.y + this.margin.y,
      this.width - 2 * this.margin.x,
      this.height - 2 * this.margin.y,
      'F',
    );
  }

  drawPadding() {
    if (!DRAW_PADDING) return;

    // console.log(
    //   this.name,
    //   this.position.x + this.margin.x,
    //   this.position.y + this.margin.y,
    //   this.width - this.margin.x,
    //   this.height - this.margin.y,
    // );

    const marginColor = '#88ff88';
    this.pdf.setDrawColor(marginColor);
    this.pdf.setFillColor(marginColor);
    this.pdf.rect(
      this.position.x + this.margin.x,
      this.position.y + this.margin.y,
      this.width - 2 * this.margin.x,
      this.height - 2 * this.margin.y,
      'F',
    );

    this.pdf.setDrawColor(this.bgColor || 'white');
    this.pdf.setFillColor(this.bgColor || 'white');
    this.pdf.rect(
      this.position.x + this.margin.x + this.padding.x,
      this.position.y + this.margin.y + this.padding.y,
      this.width - 2 * this.margin.x - 2 * this.padding.x,
      this.height - 2 * this.margin.y - 2 * this.padding.y,
      'F',
    );
  }

  setFont() {
    this.pdf.setFontSize(this.font.size);
    this.pdf.setTextColor(this.font.color);
    this.pdf.setFont(this.font.family);
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

    const textDimensions = this.pdf.getTextDimensions(this.text, {
      // font: 'courier',
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
    }
    const dimensions = {
      w: 2 * this.margin.x + 2 * this.padding.x + contentDimensions.w,
      h: 2 * this.margin.y + 2 * this.padding.y + contentDimensions.h,
    };
    return dimensions;
  }

  addChild(childData: IFrameworkOptions) {
    // console.log(childData);
    const foundChild = this.children.find((existentChild) => existentChild.name === childData.name);
    if (foundChild) {
      throw new Error('Child name already exists');
    }

    const child = new Framework(
      this.pdf,
      {
        ...childData,
        position: {
          x: this.position.x + this.cursor.x + this.margin.x + this.padding.x,
          y: this.position.y + this.cursor.y + this.margin.y + this.padding.y,
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

    const freeWidth = (this.width || this.maxWidth) - 2 * this.margin.x - 2 * this.padding.x;

    const freeHeight = this.height - 2 * this.margin.y - 2 * this.padding.y;

    childrenData.forEach((childData) => {
      this.addChild({ ...childData, maxWidth: childData.maxWidth || freeWidth });
    });

    let childrenWidth;
    let childrenHeight;
    if (this.direction === 'h') {
      childrenWidth = this.children.reduce((total, child) => (total + child.width), 0);
      childrenHeight = this.children.reduce((total, child) => (
        child.height > total ? child.height : total), 0);
    } else {
      childrenWidth = this.children.reduce((total, child) => (
        child.width > total ? child.width : total), 0);
      childrenHeight = this.children.reduce((total, child) => (total + child.height), 0);
    }


    /aqui devemos calcular um vetor de acordo com a orientaçao do parent

    const remainingWidth = freeWidth - childrenWidth;

    // apply justification
    const numberOfSpaces = this.children.length - 1;
    const betweenWidth = remainingWidth / numberOfSpaces;
    const startFreeSpace = remainingWidth / 2;
    switch (this.justify) {
      case 'between':
        this.children.forEach((child, index) => { child.position.x += index * betweenWidth; });
        break;
      case 'center':
        this.children.forEach((child) => { child.position.x += startFreeSpace; });
        break;
      case 'end':
        this.children.forEach((child) => { child.position.x += remainingWidth; });
        break;

      default:
        break;
    }

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

  write(text: string = '', options?: IWriteOptions) {
    const textDimensions = this.pdf.getTextDimensions(text, {
      font: options?.font?.family,
      fontSize: options?.font?.size,
      maxWidth: this.width - this.cursor.x - 2 * this.margin.x - 2 * this.padding.x,
    });

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
      text,
      this.cursor.x + this.margin.x + this.position.x + this.padding.x,
      this.cursor.y + this.margin.y + this.position.y + this.padding.y,
      { baseline: 'top', maxWidth: this.width - this.cursor.x - 2 * this.margin.x - 2 * this.padding.x },
    );

    if (this.direction === 'v') {
      this.cursor.y += this.lineSpacing + textDimensions.h;
    } else {
      this.cursor.x += this.wordSpacing + textDimensions.w;
    }
  }
}

const buildPDF = (curriculum: ICurriculum) => {
  const pdf = new JsPDF('p', 'mm');

  console.log('-----------------------------');

  const document = new Framework(pdf, {
    height: pageDimensions.h,
    width: pageDimensions.w,
    name: 'body',
    direction: 'v',
    children: [
      {
        name: 'header',
        // height: 60,
        // width: 200,
        bgColor: colorSchema.primary,
        padding: { x: 4, y: 4 },
        fullWidth: true,
        // margin: { x: 4, y: 4 },
        children: [
          {
            name: 'name',
            text: 'This is my nane',
            bgColor: 'red',
            // fullWidth: true,

            // font: { size: 20, color: 'white', family: 'helvetica' },
          },
          {
            name: 'title',
            text: 'This is my title',
            bgColor: 'yellow',
          },
        ],
      },
      {
        name: 'main',
        direction: 'h',
        margin: { x: 10, y: 10 },
        padding: { x: 10, y: 10 },
        bgColor: 'violet',
        fullWidth: true,
        // text: 'this is the MAIN',
        justify: 'end',
        children: [
          {
            name: 'content', margin: { x: 0, y: 0 }, bgColor: '#116699', text: 'CONTENT',
          },
          {
            name: 'content2', margin: { x: 0, y: 0 }, bgColor: '#116699', text: 'CONTENT2',
          },
          {
            name: 'aside', height: 20, margin: { x: 0, y: 0 }, bgColor: '#005544', text: 'ASIDE', fullWidth: false,
          },
        ],
      },
    ],
  });

  document.render();

  // const header = document.findNode('header');
  // const content = document.findNode('content');
  // const aside = document.findNode('aside');

  // header?.write('HEADER aksjdh kjha hdkasj h h h aksjdh  hh aksjd  dhaksjd  aksjd  hd hk aj sh h hk jhk jh kj  hkj h');
  // header?.write('HEADER aksjdh kjha hdkasj h h h aksjdh  hh aksjd  dhaksjd  aksjd  hd hk aj sh h hk jhk jh kj  hkj h');

  // console.log(content);

  // const aside = document.getChild('main').getChild('aside');

  // document.addChild({
  //   name: 'child1', width: 100, height: 200, margin: { x: 0, y: 0 }, bgColor: '#aa5544',
  // });
  // document.addChild({
  //   name: 'child2', width: 800, height: 200, margin: { x: 0, y: 0 }, bgColor: '#005544',
  // });

  // document.buildChildren([
  //   {
  //     name: 'child1', width: 30, height: 200, margin: { x: 0, y: 0 }, bgColor: '#aa5544',
  //   },
  //   {
  //     name: 'child2', height: 200, margin: { x: 0, y: 0 }, bgColor: '#005544',
  //   },
  // ]);

  // pdf.addPage();

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
  // content?.write('CONTENT');
  // aside?.write('ASIDE');
  // const a = 'Desenvolvedor Fullstack lfksdjf lskjdfl ksjdfl a z kjsldfk jsldkfj sldk fjsld kfjs lkdfj slk Desenvolvedor Fullstack fsj dfjj oiu   uoiuoiu';
  // // document.cursor = { x: 100, y: 0 };
  // for (let i = 0; i < 40; i += 1) {
  //   content?.write(`a-${i} - ${a}`);
  // }
  // for (let i = 0; i < 40; i += 1) {
  //   aside?.write(`b-${i} - ${a}`);
  // }
  // document.write(`${curriculum.personal?.title}` || '');
  // document.write(`${curriculum.personal?.title}` || '');
  // document.write(`${curriculum.personal?.title}` || '');

  return pdf.output();
};

export default buildPDF;
