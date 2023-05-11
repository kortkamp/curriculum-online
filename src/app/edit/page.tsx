'use client';

import Curriculum from '@/components/Curriculum';
import ICurriculum from '@/types/ICurriculum';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';

import { curriculum } from '../page';
import AppAccordion, { AppAccordionItem } from './components/Accordion';
import AddButton from './components/AddButton';
import Experience from './components/Experience';
import Input from './components/Input';
import RemoveButton from './components/RemoveButton';
import Skill from './components/Skill';

// type OptionalPersonalFields = Record<string, string>;

const optionalPersonalFields = [
  'Linkedin',
  'Site',
  'Data de Nascimento',
  'CNH',
  'CPF',
];

export default function Home() {
  const {
    register, handleSubmit, watch, control,
  } = useForm<ICurriculum>({
    defaultValues: curriculum,
  });

  const otherPersonal = useFieldArray({
    control,
    name: 'personal.other',
  });

  const education = useFieldArray({
    control,
    name: 'education',
  });

  const experience = useFieldArray({
    control,
    name: 'experience',
  });

  const skills = useFieldArray({
    control,
    name: 'skills',
  });

  const languages = useFieldArray({
    control,
    name: 'languages',
  });

  const otherOptionalPersonal = watch('personal.other').map((other) => other.name);

  const optionalButtons = optionalPersonalFields.filter(
    (field) => !otherOptionalPersonal.includes(field),
  );

  const onSubmit: SubmitHandler<ICurriculum> = (data) => console.log(data);
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl m-auto">
          <AppAccordion>
            <AppAccordionItem value="Dados Pessoais" className="flex flex-col gap-5">
              <div className="flex justify-between gap-4 flex-1 max-md:flex-col">
                <Input {...register('personal.name')} label="Nome" md={6} />
                <Input {...register('personal.surname')} label="Sobrenome" md={6} />
              </div>
              <div className="flex justify-between gap-4 flex-1">
                <Input {...register('personal.title')} label="Título" md={6} />
                <Input {...register('personal.mail')} label="Email" md={6} />
              </div>
              <div className="flex justify-between gap-4 flex-1">
                <Input {...register('personal.phone')} label="Telefone" md={6} />
                <Input {...register('personal.location')} label="Endereço" md={6} />
              </div>
              <div>
                {otherPersonal.fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-1">
                    <Input {...register(`personal.other.${index}.value`)} label={field.name} md={10} />
                    <RemoveButton onClick={() => otherPersonal.remove(index)} className="mb-[2px]" title="Remover o campo" />
                  </div>
                ))}
              </div>
              <div className="flex gap-5 flex-wrap">
                {optionalButtons.map((button) => (
                  <AddButton
                    key={button}
                    onClick={() => otherPersonal.append({ name: button, value: '' })}
                    title="Adicionar o campo"
                  >
                    {button}
                  </AddButton>
                ))}
              </div>
            </AppAccordionItem>
            <AppAccordionItem value="Resumo">
              <Input label="Resumo" md={12} rows={10} asChild {...register('resume')} className="text-sm">
                <textarea />
              </Input>

            </AppAccordionItem>
            <AppAccordionItem value="Formação">
              <div className="flex flex-col gap-4">
                {education.fields.map((item, index) => (
                  <Experience
                    key={item.id}
                    index={index}
                    data={watch(`education.${index}`)}
                    register={register}
                    remove={education.remove}
                    fieldName="education"
                  />
                ))}
                <div>
                  <AddButton onClick={() => education.append({ title: '', origin: '' })}>Adicionar Formação</AddButton>
                </div>
              </div>
            </AppAccordionItem>
            <AppAccordionItem value="Experience">
              <div className="flex flex-col gap-4">
                {experience.fields.map((item, index) => (
                  <Experience
                    key={item.id}
                    index={index}
                    data={watch(`experience.${index}`)}
                    register={register}
                    remove={experience.remove}
                    fieldName="experience"
                  />
                ))}
                <div>
                  <AddButton onClick={() => experience.append({ title: '', origin: '' })}>Adicionar Experiência</AddButton>
                </div>
              </div>
            </AppAccordionItem>
            <AppAccordionItem value="Competências">
              <div className="flex flex-col gap-4">
                {skills.fields.map((item, index) => (
                  <Skill
                    key={item.id}
                    index={index}
                    data={watch(`skills.${index}`)}
                    register={register}
                    remove={skills.remove}
                    fieldName="skills"
                  />
                ))}
                <div>
                  <AddButton
                    onClick={() => { skills.append({ title: '', level: 0 }); }}
                  >
                    Adicionar Competência

                  </AddButton>
                </div>
              </div>
            </AppAccordionItem>
            <AppAccordionItem value="Idiomas">
              <div className="flex flex-col gap-4">
                {languages.fields.map((item, index) => (
                  <Skill
                    key={item.id}
                    index={index}
                    data={watch(`languages.${index}`)}
                    register={register}
                    remove={languages.remove}
                    fieldName="languages"
                  />
                ))}
                <div>
                  <AddButton onClick={() => languages.append({ title: '', level: 0 })}>Adicionar Competência</AddButton>
                </div>
              </div>
            </AppAccordionItem>
          </AppAccordion>

          <input type="submit" value="Salvar" className="text-primary-light" />
        </form>
      </div>
      <aside className="flex-1 overflow-y-scroll">
        <div className="scale-75">
          <Curriculum curriculum={watch()} />
        </div>
      </aside>
    </div>
  );
}
