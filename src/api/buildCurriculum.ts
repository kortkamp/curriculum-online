import ICurriculum from '@/types/ICurriculum';
import { jsPDF as JsPDF } from 'jspdf';

import '../assets/Poppins-Regular-normal';

const pagePadding = {
  x: 10,
  y: 10,
};

const buildPDF = (curriculum: ICurriculum) => {
  const pdf = new JsPDF('p', 'mm');

  pdf.setDrawColor('#2c3544');
  pdf.setFillColor('#2c3544');
  pdf.rect(0, 0, 210, 42, 'F');
  pdf.setFontSize(24);
  pdf.setTextColor('white');
  pdf.setFont('Poppins-Regular', 'normal');

  console.log(pdf.getFontList());

  pdf.text(`${curriculum.personal?.name} ${curriculum.personal?.surname}` || '', pagePadding.x, pagePadding.y, { maxWidth: 300, baseline: 'top' });
  pdf.setFontSize(20);
  // pdf.text(`${curriculum.personal?.title}` || '', 10, 5, { maxWidth: 300, align: 'center' });

  return pdf.output();
};

export default buildPDF;
