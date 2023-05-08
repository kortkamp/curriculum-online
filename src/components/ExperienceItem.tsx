import Text from './Text';

export interface ExperienceData {
  company: string
  position: string
  description: string
  startDate: string
  endDate:string
}

interface Props {
  experienceData : ExperienceData
}

function ExperienceItem({ experienceData }:Props) {
  return (
    <div className="">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <Text variant="subtitle">{experienceData.position}</Text>
          <Text variant="light">{experienceData.company}</Text>
        </div>
        <div>
          <Text>
            {experienceData.startDate}
            {' '}
            -
            {experienceData.endDate}
          </Text>
        </div>
      </header>
      <div className="max-w-lg">
        <Text>{experienceData.description}</Text>
      </div>
      <aside className="w-48" />
    </div>
  );
}

export { ExperienceItem };
