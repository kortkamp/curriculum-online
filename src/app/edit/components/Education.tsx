import ICurriculum from '@/types/ICurriculum';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import Button from './Button';
import EditButton from './EditButton';
import Input from './Input';
import RemoveButton from './RemoveButton';

interface Props {
  index: number
  register: UseFormRegister<ICurriculum>
  education: ICurriculum['education'][number]
}

function Education({ index, register, education }:Props) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="border p-4 rounded">
        <Input label="Formação" {...register(`education.${index}.course`)} />
        <div className="flex justify-between gap-4 flex-1 max-md:flex-col">
          <Input label="Instituição" md={6} {...register(`education.${index}.institution`)} />
          <Input label="Cidade" md={6} {...register(`education.${index}.city`)} />
        </div>
        <div className="flex justify-between gap-4 flex-1 max-md:flex-col">
          <div className="flex justify-between gap-4 flex-1 max-md:flex-col items-end">
            <Input label="Data de Início" md={6} />
            <Input label="" md={6} />
          </div>
          <div className="flex justify-between gap-4 flex-1 max-md:flex-col items-end">
            <Input label="Data de Término" md={6} />
            <Input label="" md={6} />
          </div>
        </div>
        <Input label="Resumo" md={12} rows={10} asChild className="text-sm" {...register(`education.${index}.description`)}>
          <textarea />
        </Input>
        <div className="flex gap-4 flex-1 max-md:flex-col justify-end pt-4">
          <RemoveButton />
          <Button
            className="text-white bg-primary"
            onClick={() => setIsEditing(false)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-medium font-semibold">{education.course}</span>
        <span>
          {education.institution}
          {education.city && `, ${education.city}`}
        </span>
      </div>
      <EditButton title="Editar o campo" onClick={() => setIsEditing(true)} />
    </div>
  );
}

export default Education;
