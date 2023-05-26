import ICurriculum from '@/types/ICurriculum';
import { jsPDF as JsPDF } from 'jspdf';

import '../assets/Poppins-Regular-normal';
import { Framework, IFrameworkOptions } from './Framework';
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
const pageDimensions = { h: 297, w: 210 };

const buildPDF = (curriculum: ICurriculum, font = '') => {
  const section = (title: string, children: IFrameworkOptions[]) => {
    const sectionData:IFrameworkOptions = {
      name: `section-${title}`,
      gap: 10,
      children: [
        {
          name: 'section-header',
          font: { color: colorSchema.primary },
          text: title,
        },
        {
          name: 'section-content',
          gap: 5,
          children,
        },
      ],
    };
    return sectionData;
  };

  const sectionItem = (
    title:string,
    sub:string,
    content:string = '',
    aside:string = '',
  ) => {
    const result:IFrameworkOptions = {
      name: title,
      font: { size: 10 },
      gap: 1.5,
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
              font: { size: 12 },
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

  const education = curriculum.education.map((item) => sectionItem(item.title, `${item.origin} ${item.city}`, item.description));
  const experience = curriculum.experience.map((item) => sectionItem(item.title, `${item.origin} ${item.city}`, item.description));

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
            gap: 7,
            children: [
              section('Formação', education),
              {
                name: 'divider', bgColor: colorSchema.text.contrast.light, fullWidth: true, height: 0.1,
              },
              section('Experiência', experience),
              {
                name: 'divider', bgColor: colorSchema.text.contrast.light, fullWidth: true, height: 0.1,
              },
              section('Experiência', experience),
            ],

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

  const prefix = 'data:application/pdf; filename=generated.pdf; base64,';
  return prefix + window.btoa(pdf.output());
};

export default buildPDF;
