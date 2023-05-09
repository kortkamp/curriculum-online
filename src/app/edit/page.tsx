'use client';

import Curriculum from '@/components/Curriculum';
import ICurriculum from '@/types/ICurriculum';
import { useForm, SubmitHandler } from 'react-hook-form';

import { curriculum } from '../page';
import AccordionDemo, { AccordionItem } from './components/Accordion';

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
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-2xl'>
          <AccordionDemo>
            <AccordionItem name={"Dados Pessoais"}>
              <input  {...register('personal.name')} />
            </AccordionItem>
          </AccordionDemo>
          
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
