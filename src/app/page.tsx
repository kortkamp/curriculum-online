'use client';

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
    other: [
      {
        name: 'Site',
        value: 'https://kortkamp.dev',
      },
      {
        name: 'Github',
        value: 'https://github.com/kortkamp',
      },
      {
        name: 'Linkedin',
        value: 'https://www.linkedin.com/in/kortkamp/',
      },
    ],
  },
  resume: `Sou um desenvolvedor fullstack com foco no ecossistema Javascript/Typescript, 
          tenho conhecimento e experiência em várias ferramentas relacionadas assim como versionamento e métodos ágeis.
          Minhas principais características como profissional são: responsabilidade com prazos e resultados,
          respeito, cordialidade e principalmente paixão por escrever código e entregar soluções.`,
  experience: [
    {
      origin: 'Pemak Sistemas',
      title: '1Fullstack Developer',
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
      origin: 'Startup Escolar',
      title: '2Fullstack Developer',
      description: 'Atuei no desenvolvimento de SaaS multi tenant para gestão escolar usando Node, React, Postgres',
      start: {
        month: 3,
        year: 2023,
      },
      end: {
        month: 3,
        year: 2023,
      },
      isCurrent: false,
    },
    {
      origin: 'Creative Code - Londrina',
      title: '3Backend Developer',
      description: 'Atuei no desenvolvimento e manutenção de APIs para sistemas diversos usando Node',
      start: {
        month: 3,
        year: 2022,
      },
      end: {
        month: 3,
        year: 2023,
      },
      isCurrent: false,
    },
  ],
  education: [{
    title: 'Análise e Desenvolvimento de Sistemas',
    origin: 'Uninter (em andamento)',
  },
  {
    title: 'Física',
    origin: 'UFF',
    city: 'Santo Antonio de Padua',
  },
  {
    title: 'Física',
    origin: 'UERJ',
    city: 'Santo Antonio de Padua',
  },
  {
    title: 'Física',
    origin: 'USP',
    city: 'Santo Antonio de Padua',
  },
  ],

  skills: [
    {
      title: 'Node',
      level: 0,
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
    {
      title: 'Árabe',
      level: 3,
    },
    {
      title: 'Curdo',
      level: 3,
    },
    {
      title: 'Turco',
      level: 3,
    },
    {
      title: 'Farsi',
      level: 3,
    },
    {
      title: 'Urdu',
      level: 3,
    },
    {
      title: 'Yanomami',
      level: 3,
    },
    {
      title: 'Tupi',
      level: 3,
    },
    {
      title: 'Guarani',
      level: 3,
    },
    {
      title: 'Marajoara',
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
