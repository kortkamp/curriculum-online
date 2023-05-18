import ICurriculum from '@/types/ICurriculum';
import { jsPDF as JsPDF } from 'jspdf';

const buildPDF = (curriculum: ICurriculum) => {
  const pdf = new JsPDF('p', 'mm');

  pdf.setFontSize(40);
  pdf.text(curriculum.personal?.name || '', 35, 25);
  pdf.setFontSize(20);

  return window.btoa(pdf.output());
};

export default buildPDF;
