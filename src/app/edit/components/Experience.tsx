import ICurriculum, { IExperience } from '@/types/ICurriculum';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import Button from './Button';
import EditButton from './EditButton';
import Input from './Input';
import RemoveButton from './RemoveButton';

interface Props {
  index: number
  register: UseFormRegister<ICurriculum>
  data: IExperience
  remove: (index: number) => void
  fieldName: 'education' | 'experience'
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function Experience({
  index, register, data, remove, fieldName,
}:Props) {
  const [isEditing, setIsEditing] = useState(data.title === '');

  // years = [2023, 2022, 2021, ...]
  const currentYear = (new Date()).getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  if (isEditing) {
    return (
      <div className="border p-4 rounded">
        <Input label={fieldName === 'education' ? 'Formação' : 'Função'} {...register(`${fieldName}.${index}.title`)} />
        <div className="flex justify-between gap-4 flex-1 max-md:flex-col">
          <Input label={fieldName === 'education' ? 'Instituição' : 'Empresa'} md={6} {...register(`${fieldName}.${index}.origin`)} />
          <Input label="Cidade" md={6} {...register(`${fieldName}.${index}.city`)} />
        </div>
        <div className="flex justify-between gap-4 flex-1 max-md:flex-col">
          <div className="flex justify-between gap-4 flex-1 max-md:flex-col items-end">
            <Input label="Data de Início" md={6} {...register(`${fieldName}.${index}.start.month`, { valueAsNumber: true })} asChild>
              <select>
                <option value={0} className="text-light">Mês</option>
                {months.map((month, monthIndex) => (
                  <option key={month} value={monthIndex + 1}>{month}</option>
                ))}
              </select>
            </Input>
            <Input label="" md={6} asChild {...register(`${fieldName}.${index}.start.year`, { valueAsNumber: true })}>
              <select>
                <option value={0} className="text-light">Ano</option>
                { years.map((year) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </Input>
          </div>
          <div className="flex justify-between gap-4 flex-1 max-md:flex-col items-end">
            <Input label="Data de Término" md={6} {...register(`${fieldName}.${index}.end.month`, { valueAsNumber: true })} asChild>
              <select>
                <option value={0} className="text-light">Mês</option>
                {months.map((month, monthIndex) => (
                  <option key={month} value={monthIndex + 1}>{month}</option>
                ))}
              </select>
            </Input>
            <Input label="" md={6} asChild {...register(`${fieldName}.${index}.end.year`, { valueAsNumber: true })}>
              <select>
                <option value={0} className="text-light">Ano</option>
                { years.map((year) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </Input>
          </div>
        </div>
        <Input label="Descrição" md={12} rows={10} asChild className="text-sm" {...register(`${fieldName}.${index}.description`)}>
          <textarea />
        </Input>
        <div className="flex gap-4 flex-1 max-md:flex-col justify-end pt-4">
          <RemoveButton onClick={() => remove(index)} />
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
        <span className="text-medium font-semibold">{data.title}</span>
        <span>
          {data.origin}
          {data.city && `, ${data.city}`}
        </span>
      </div>
      <EditButton title="Editar o campo" onClick={() => setIsEditing(true)} />
    </div>
  );
}

export default Experience;
