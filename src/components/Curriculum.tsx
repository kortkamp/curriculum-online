import ICurriculum from '@/types/ICurriculum';
import Divider from './Divider';
import ExperienceItem from './ExperienceItem';
import Header from './Header';
import Personal from './Personal';
import SafeArea from './SafeArea';
import Section from './Section';
import Text from './Text';

interface Props {
  curriculum: ICurriculum
}

function Curriculum({ curriculum }: Props) {
  const {
    resume, experience, education, personal, skills, languages,
  } = curriculum;

  return (
    <div className="w-[210mm] h-[297mm] bg-gray-50">
      <Header data={personal} />
      <main className="mt-10">
        <SafeArea className="flex gap-2">
          <article className="w-2/3">
            <Section title="Resumo" className="flex gap-10">
              <Text>{resume}</Text>
            </Section>
            <Divider />
            <Section title="Experiência" className="flex gap-10">
              {
                experience.map((item) => (
                  <ExperienceItem key={item.origin + item.title} experienceData={item} />
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
          <aside className="w-1/3">
            <Section title="Dados Pessoais" variant="aside">
              <Personal data={personal.other} />
            </Section>
            <Divider />
            <Section title="Competências" variant="aside">
              {skills.map((skill) => (
                <Text key={skill.title}>{skill.title}</Text>
              ))}
            </Section>
            <Divider />
            <Section title="Idiomas" variant="aside">
              {languages.map((language) => (
                <Text key={language.title}>{language.title}</Text>
              ))}
            </Section>
          </aside>
        </SafeArea>
      </main>
    </div>
  );
}

export default Curriculum;
