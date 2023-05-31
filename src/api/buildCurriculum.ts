import ICurriculum from '@/types/ICurriculum';
import { jsPDF as JsPDF } from 'jspdf';

import '../assets/Poppins-Regular-normal';
import { Framework, IFrameworkOptions } from './Framework';
// import '../assets/Poppins-Medium-normal';

const Months = [
  '',
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

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
  const divider = {
    name: 'divider', bgColor: colorSchema.text.contrast.light, fullWidth: true, height: 0.1,
  };

  const section = (title: string, children: IFrameworkOptions[]) => {
    const sectionData:IFrameworkOptions = {
      name: `section-${title}`,
      gap: 10,
      allowSplit: true,
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

  interface ISectionProps {
    title:string;
    sub?:string,
    content?:string,
    aside?:string,
  }
  const sectionItem = (
    {
      title,
      sub = '',
      content = '',
      aside = '',
    }: ISectionProps,
  ) => {
    const result:IFrameworkOptions = {
      name: `section-item-${title}`,
      font: { size: 10 },
      gap: 1.5,
      fullWidth: true,
      allowSplit: false,
      // bgColor: 'blue',
      children: [
        {
          name: 'header',
          justify: 'between',
          direction: 'h',
          children: [
            {
              name: 'title',
              text: title || '',
              font: { size: 12 },
            },
            {
              name: 'aside',
              text: aside || '',
            },
          ],
        },
        {
          name: 'sub',
          font: { color: '#8f8f8f' },
          text: sub || '',
        },
        {
          name: 'content',
          text: content || '',
        },
      ],
    };

    return result;
  };

  const skillItem = (
    title:string,
    value?:number,
  ) => {
    const result:IFrameworkOptions = {
      name: `section-item-${title}`,
      font: { size: 10 },
      gap: 1.5,
      fullWidth: true,
      allowSplit: false,
      // bgColor: 'blue',
      children: [
        {
          name: 'title',
          text: title || '[title]',
          font: { size: 12 },
          // bold
        },
      ],
    };

    return result;
  };

  const education = curriculum.education.map((item) => {
    const start = `${item.start?.month ? Months[item.start?.month] : ''} ${item.start?.year ? item.start?.year : ''}`.trim();
    const end = item.isCurrent ? 'atual' : `${item.end?.month ? Months[item.end?.month] : ''} ${item.end?.year ? item.end?.year : ''}`.trim();
    const aside = `${start}${end !== '' && start !== '' ? ' - ' : ''}${end}`;
    return sectionItem(
      {
        title: item.title,
        sub: `${item.origin} ${item.city}`,
        content: item.description,
        aside,
      },
    );
  });
  const experience = curriculum.experience.map((item) => {
    const start = `${item.start?.month ? Months[item.start?.month] : ''} ${item.start?.year ? item.start?.year : ''}`.trim();
    const end = item.isCurrent ? 'atual' : `${item.end?.month ? Months[item.end?.month] : ''} ${item.end?.year ? item.end?.year : ''}`.trim();
    const aside = `${start}${end !== '' && start !== '' ? ' - ' : ''}${end}`;
    return sectionItem(
      {
        title: item.title,
        sub: `${item.origin} ${item.city || ''}`,
        content: item.description,
        aside,
      },
    );
  });

  const data: IFrameworkOptions = {
    height: pageDimensions.h,
    width: pageDimensions.w,
    pageProperties: {
      h: pageDimensions.h,
      w: pageDimensions.w,
      margin: { x: 10, y: 10 },
    },
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
              // section('Formação', education),
              {
                name: 'divider', bgColor: colorSchema.text.contrast.light, fullWidth: true, height: 150,
              },
              // section('Experiência', experience),
              {
                name: 'divider', bgColor: colorSchema.text.contrast.light, fullWidth: true, height: 0.1,
              },
              section('Experiência', experience),
              {
                name: 'divider', bgColor: colorSchema.text.contrast.light, fullWidth: true, height: 0.1,
              },
              section('Formação', education),
              {
                name: 'divider', bgColor: colorSchema.text.contrast.light, fullWidth: true, height: 100,
              },
              section('Experiência', experience),

            ],

          },
          {
            name: 'aside',
            width: 53,
            margin: { x: 0, y: 0 },
            // bgColor: '#005544',
            gap: 7,
            fullWidth: false,
            children: [
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
              section('Idiomas', curriculum.languages.map((item) => skillItem(item.title))),
              divider,
            ],
          },
        ],
      },
    ],
  };

  const pdf = new JsPDF('p', 'mm');

  const document = new Framework(pdf, data);

  document.render();

  console.log('==========================================');

  console.log(curriculum);

  const prefix = 'data:application/pdf; filename=generated.pdf; base64,';
  return prefix + window.btoa(pdf.output());
};

export default buildPDF;
