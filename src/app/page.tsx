import Divider from '@/components/Divider';
import { ExperienceData, ExperienceItem } from '@/components/ExperienceItem';
import Header from '@/components/Header';
import Personal from '@/components/Personal';
import SafeArea from '@/components/SafeArea';
import Section from '@/components/Section';
import Text from '@/components/Text';

const experienceData: ExperienceData[] = [
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
];

const skills = [
  'Node',
  'React / Next.js',
  'Git',
  'PostgreSQL, MySQL, SQLite',
  'Mongo, REDIS',
  'Docker',
  'CI CD',
  'SOLID, DDD, TDD',
];

const languages = [
  'Português nativo',
  'Inglês intermediário',
];

const resume = `Sou um desenvolvedor fullstack com foco no ecossistema Javascript/Typescript, 
tenho conhecimento e experiência em várias ferramentas relacionadas assim como versionamento e métodos ágeis.
Minhas principais características como profissional são: responsabilidade com prazos e resultados,
 respeito, cordialidade e principalmente paixão por escrever código e entregar soluções.`;

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="mt-10">
        <SafeArea className="flex gap-2">
          <article className="w-4/5">
            <Section title="Resumo" className="flex gap-10">
              <Text>{resume}</Text>
            </Section>
            <Divider />
            <Section title="Experiência" className="flex gap-10">
              {
                experienceData.map((item) => (
                  <ExperienceItem key={item.company + item.position} experienceData={item} />
                ))
              }
            </Section>
            <Divider />

            <Section title="Educação">
              <div className="flex flex-col">
                <Text variant="subtitle">Análise e Desenvolvimento de Sistemas</Text>
                <Text variant="light">Uninter (em andamento)</Text>
              </div>
            </Section>
          </article>
          <Divider variant="vertical" />
          <aside className="">
            <Section title="Dados Pessoais" variant="aside">
              <Personal />
            </Section>
            <Divider />
            <Section title="Competências" variant="aside">
              {skills.map((skill) => (
                <Text key={skill}>{skill}</Text>
              ))}
            </Section>
            <Divider />
            <Section title="Idiomas" variant="aside">
              {languages.map((language) => (
                <Text key={language}>{language}</Text>
              ))}
            </Section>
          </aside>
        </SafeArea>
      </main>

    </div>
  );
}
