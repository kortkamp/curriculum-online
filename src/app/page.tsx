import Curriculum from '@/components/Curriculum';
import ICurriculum from '@/types/ICurriculum';

export const curriculum:ICurriculum = {
  personal: {
    name: 'Marcelo',
    surname: 'Teixeira',
    title: 'Desenvolvedor FullStack',
    mail: 'marcelusmedius@gmail.com',
    phone: '(22) 99708-8801',
    location: 'Aperibé - RJ',
    locationLink: 'https://goo.gl/maps/2sELRQKVCeHoHok57',
    social: [
      {
        type: 'Site',
        url: 'https://kortkamp.dev',
      },
      {
        type: 'Github',
        url: 'https://github.com/kortkamp',
      },
      {
        type: 'Linkedin',
        url: 'https://www.linkedin.com/in/kortkamp/',
      },
    ],
  },
  resume: `Sou um desenvolvedor fullstack com foco no ecossistema Javascript/Typescript, 
          tenho conhecimento e experiência em várias ferramentas relacionadas assim como versionamento e métodos ágeis.
          Minhas principais características como profissional são: responsabilidade com prazos e resultados,
          respeito, cordialidade e principalmente paixão por escrever código e entregar soluções.`,
  experience: [
    {
      company: 'Pemak Sistemas',
      position: 'Fullstack Developer',
      description: 'Atuei no desenvolvimento de SaaS para geração de portais de prestação de contas para ONGs, fui responsável desde a modelagem ao deploy e manutenção do sistema',
      start: {
        month: 3,
        year: 2023,
      },
      end: {
        month: 3,
        year: 2024,
      },
      isCurrent: true,
    },
    {
      company: 'Startup Escolar',
      position: 'Fullstack Developer',
      description: 'Atuei no desenvolvimento de SaaS multi tenant para gestão escolar usando Node, React, Postgres',
      start: {
        month: 3,
        year: 2023,
      },
      end: {
        month: 3,
        year: 2024,
      },
      isCurrent: false,
    },
    {
      company: 'Creative Code - Londrina',
      position: 'Backend Developer',
      description: 'Atuei no desenvolvimento e manutenção de APIs para sistemas diversos usando Node',
      start: {
        month: 3,
        year: 2023,
      },
      end: {
        month: 3,
        year: 2024,
      },
      isCurrent: false,
    },
  ],
  education: [{
    course: 'Análise e Desenvolvimento de Sistemas',
    institution: 'Uninter (em andamento)',

  }],

  skills: [
    {
      title: 'Node',
      level: 4,
    },
    {
      title: 'React / Next.js',
      level: 4,
    },
    {
      title: 'Git',
      level: 4,
    },
    {
      title: 'Gambiarra',
      level: 5,
    },

  ],
  languages: [
    {
      title: 'Português',
      level: 5,
    },
    {
      title: 'Inglês',
      level: 3,
    },
  ],
};

export default function Home() {
  return (
    <div className="flex justify-center">
      <Curriculum curriculum={curriculum} />
    </div>
  );
}
