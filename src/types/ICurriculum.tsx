interface Skill {
  title:string
  level?: number
}

interface Language {
  title:string
  level?: number
}

interface Course {
  name:string
  month: number
  year: number
  description:string
}

interface MonthYear {
  month: number, year: number
}

export interface IExperience {
  title: string
  origin: string
  city?: string
  start: MonthYear
  end?: MonthYear
  isCurrent: boolean
  description: string
}

export interface IPersonalData {
  name: string,
  surname: string,
  title: string,
  mail: string,
  phone: string,
  location?: string,
  locationLink?: string,
  other:
  {
    name: string,
    value: string,
  }[]
}

export default interface ICurriculum {
  personal: IPersonalData
  resume:string
  experience: IExperience[]
  education: {
    course: string
    institution: string,
    city?: string
    description?: string
  }[]
  courses?: Course[]
  skills: Skill[]
  languages: Language[]
}
