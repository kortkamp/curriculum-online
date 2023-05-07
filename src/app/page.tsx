import Divider from "@/components/Divider";
import { ExperienceData, ExperienceItem } from "@/components/ExperienceItem";
import Header from "@/components/Header";
import Personal from "@/components/Personal";
import { SafeArea } from "@/components/SafeArea";
import Section from "@/components/Section";
import Text from "@/components/Text";


const experienceData: ExperienceData[] = [
  { 
    company: "Pemak Sistemas",
    position: "Fullstack Developer",
    description: `Atuei no desenvolvimento de SaaS para geração de prestação de contas para APAEs`,
    startDate: "02/2023",
    endDate: "atual" 
  },
  { 
    company: "Startup Escolar",
    position: "Fullstack Developer",
    description: `Atuei no desenvolvimento de SaaS multi tenant para gestão escolar usando Node, React, Postgres`,
    startDate: "06/2022",
    endDate: "02/2023" 
  },
  { 
    company: "Creative Code - Londrina",
    position: "Backend Developer",
    description: "Atuei no desenvolvimento e manutenção de APIs para sistemas diversos usando Node",
    startDate: "11/2022",
    endDate: "04/2022" 
  }
]

const skills = [
  'Node',
  'React',
  'Next.js',
  'Github',
  'PostgreSQL, MySQL, SQLite',
  'Mongo, REDIS',
  'Docker',
  'SOLID, DDD, TDD'
]

const languages = [
  'Português nativo',
  'Inglês intermediário',
]

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="mt-10">
        <SafeArea className="flex gap-2">
          <article className="w-4/5">
            <Section title="Experiência" className="flex gap-10">
              {
                experienceData.map((item, index) => (
                  <ExperienceItem key={index} experienceData={item} />
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
          <Divider variant="vertical"></Divider>
          <aside className="">
            <Section title="Dados Pessoais" variant="aside">
              <Personal />
            </Section>
            <Divider />
            <Section title="Competências" variant="aside">
              {skills.map(skill => (
                <Text key={skill}>{skill}</Text>
              ))}
            </Section>
            <Divider />
            <Section title="Idiomas" variant="aside">
              {languages.map(language => (
                <Text key={language}>{language}</Text>
              ))}
            </Section>
          </aside>
        </SafeArea>
      </main>

    </div>
  )
}
