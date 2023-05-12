import ICurriculum from '@/types/ICurriculum';
import { useState } from 'react';
import Divider from './Divider';
import ExperienceItem from './ExperienceItem';
import Header from './Header';
import Personal from './Personal';
import SafeArea from './SafeArea';
import Section from './Section';
import Text from './Text';

const pageHeight = 1122; // A4 page

interface Props {
  curriculum: ICurriculum
}

function Curriculum({ curriculum }: Props) {
  const {
    resume, experience, education, personal, skills, languages,
  } = curriculum;

  const [headerHeight, setHeaderHeight] = useState(0);
  const [resumeHeight, setResumeHeight] = useState(0);
  const [experienceHeight, setExperienceHeight] = useState(0);
  const [educationHeight, setEducationHeight] = useState(0);
  const [dividerHeight, setDividerHeight] = useState(0);

  // console.log(dividerHeight);
  // console.log(resumeHeight);
  // console.log(experienceHeight);
  // console.log(educationHeight);
  console.log(headerHeight + resumeHeight + experienceHeight + educationHeight + 2 * dividerHeight);

  return (
    <div className="w-[210mm] h-[297mm] bg-gray-50">
      <Header data={personal} notifyHeight={(height) => setHeaderHeight(height)} />
      <main className="">
        <SafeArea className="flex gap-2">
          <article className="w-2/3">
            <Section title="Resumo" className="flex gap-10" notifyHeight={(height) => setResumeHeight(height)}>
              <Text>{resume}</Text>
            </Section>
            <Divider notifyHeight={(height) => setDividerHeight(height)} />
            <Section title="Experiência" className="flex gap-10" notifyHeight={(height) => setExperienceHeight(height)}>
              {
                experience.map((item) => (
                  <ExperienceItem key={item.origin + item.title} experienceData={item} />
                ))
              }
            </Section>
            <Divider />

            <Section title="Educação" notifyHeight={(height) => setEducationHeight(height)}>
              {education.map((item) => (
                <div key={item.title + item.origin} className="flex flex-col">
                  <Text variant="subtitle">{item.title}</Text>
                  <Text variant="light">{item.origin}</Text>
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
