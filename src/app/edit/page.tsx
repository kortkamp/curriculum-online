'use client';

import Curriculum from '@/components/Curriculum';
import ICurriculum from '@/types/ICurriculum';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';

import { curriculum } from '../page';
import AppAccordion, { AppAccordionItem } from './components/Accordion';
import Input from './components/Input';

export default function Home() {
  const {
    register, handleSubmit, watch,
  } = useForm<ICurriculum>({
    defaultValues: curriculum,
  });

  const onSubmit: SubmitHandler<ICurriculum> = (data) => console.log(data);
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl m-auto">
          <AppAccordion>
            <AppAccordionItem value="Dados Pessoais">
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
            </AppAccordionItem>
            <AppAccordionItem value="Experiencias">
              <input {...register('personal.name')} />
              <input {...register('personal.surname')} />
            </AppAccordionItem>
          </AppAccordion>

          <input type="submit" value="Salvar" />
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
