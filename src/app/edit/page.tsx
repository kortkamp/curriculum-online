'use client';

import Curriculum from '@/components/Curriculum';
import ICurriculum from '@/types/ICurriculum';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { curriculum } from '../page';
import AppAccordion, { AppAccordionItem } from './components/Accordion';
import AddButton from './components/AddButton';
import Education from './components/Education';
import Input from './components/Input';

// type OptionalPersonalFields = Record<string, string>;

export default function Home() {
  const {
    register, handleSubmit, watch,
  } = useForm<ICurriculum>({
    defaultValues: curriculum,
  });

  const [optionalFields, setOptionalFields] = useState<string[]>([]);

  const onSubmit: SubmitHandler<ICurriculum> = (data) => console.log(data);
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl m-auto">
          <AppAccordion>
            <AppAccordionItem value="Dados Pessoais" className="flex flex-col gap-5">
              <div className="flex justify-between gap-4 flex-1">
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
              <div className="flex gap-5 flex-wrap">
                <AddButton>Site</AddButton>
                <AddButton>Linkedin</AddButton>
                <AddButton>Site</AddButton>
              </div>
            </AppAccordionItem>
            <AppAccordionItem value="Educação">
              <Education />
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
