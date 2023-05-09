import Curriculum from '@/components/Curriculum';

export const curriculum = {
  personal: {
    name: 'Marcelo Teixeira',
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
  experienceData: [
    {
      company: 'Pemak Sistemas',
      position: 'Fullstack Developer',
      description: 'Atuei no desenvolvimento de SaaS para geração de portais de prestação de contas para ONGs, fui responsável desde a modelagem ao deploy e manutenção do sistema',
      startDate: '2023',
      endDate: 'atual',
    },
    {
      company: 'Startup Escolar',
      position: 'Fullstack Developer',
      description: 'Atuei no desenvolvimento de SaaS multi tenant para gestão escolar usando Node, React, Postgres',
      startDate: '2022',
      endDate: '2023',
    },
    {
      company: 'Creative Code - Londrina',
      position: 'Backend Developer',
      description: 'Atuei no desenvolvimento e manutenção de APIs para sistemas diversos usando Node',
      startDate: '2021',
      endDate: '2022',
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
      <Curriculum data={curriculum} />
    </div>
  );
}
