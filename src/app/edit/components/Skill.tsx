import ICurriculum, { ISkill } from '@/types/ICurriculum';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import Button from './Button';
import EditButton from './EditButton';
import Input from './Input';
import RemoveButton from './RemoveButton';

interface Props {
  index: number
  register: UseFormRegister<ICurriculum>
  data: ISkill
  remove: (index: number) => void
  fieldName: 'skills' | 'languages'
}

const skillDescription = [
  'Escolha uma opção',
  'Iniciante',
  'Básico',
  'Intermediário',
  'Bom',
  'Muito bom',
  'Excelente',
];

function Skill({
  index, register, data, remove, fieldName,
}:Props) {
  const [isEditing, setIsEditing] = useState(data.title === '');

  if (isEditing) {
    return (
      <div className="border p-4 rounded">
        <Input label={fieldName === 'languages' ? 'Idioma' : 'Competência'} {...register(`${fieldName}.${index}.title`)} />
        <div className="flex justify-between gap-4 flex-1 max-md:flex-col items-end">
          <Input label="Nível" {...register(`${fieldName}.${index}.level`)} type="range" min={0} max={5} />
          <span>{skillDescription[data.level || 0]}</span>
        </div>

        <div className="flex gap-4 flex-1 max-md:flex-col justify-end pt-4">
          <RemoveButton onClick={() => remove(index)} title="Remover" />
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
  console.log(data.title);
  console.log(data.level);
  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-medium font-semibold">{data.title}</span>
        { data.level !== 0 && (
        <span className="text-light">
          { skillDescription[data.level || 0] }
        </span>
        )}
      </div>
      <EditButton title="Editar o campo" onClick={() => setIsEditing(true)} />
    </div>
  );
}

export default Skill;
