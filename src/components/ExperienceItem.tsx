import { IExperience } from '@/types/ICurriculum';
import Text from './Text';

interface Props {
  experienceData : IExperience
}

function ExperienceItem({ experienceData }:Props) {
  return (
    <div className="">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <Text variant="subtitle">{experienceData.title}</Text>
          <Text variant="light">{experienceData.origin}</Text>
        </div>
        <div>
          <Text>
            {experienceData.start?.year}
            {' '}
            -
            {experienceData.end?.year}
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

export default ExperienceItem;
