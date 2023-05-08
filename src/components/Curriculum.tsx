import Divider from './Divider';
import { ExperienceData, ExperienceItem } from './ExperienceItem';
import Header, { HeaderData } from './Header';
import Personal, { PersonalData } from './Personal';
import SafeArea from './SafeArea';
import Section from './Section';
import Text from './Text';

interface CurriculumData {
  headerData: HeaderData
  resume:string
  experienceData: ExperienceData[]
  education: {
    course: string
    institution: string,
  }[]
  personal: PersonalData[]
  skills: string[]
  languages: string[]
}

interface Props {
  data: CurriculumData
}

function Curriculum({ data }: Props) {
  const {
    headerData, resume, experienceData, education, personal, skills, languages,
  } = data;
  return (
    <div className="w-[210mm] h-[297mm] bg-gray-50">
      <Header data={headerData} />
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
              {education.map((item) => (
                <div key={item.course + item.institution} className="flex flex-col">
                  <Text variant="subtitle">{item.course}</Text>
                  <Text variant="light">{item.institution}</Text>
                </div>
              ))}
            </Section>
          </article>
          <Divider variant="vertical" />
          <aside className="">
            <Section title="Dados Pessoais" variant="aside">
              <Personal data={personal} />
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

export default Curriculum;
