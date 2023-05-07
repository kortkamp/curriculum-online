import { ReactNode } from "react"
import Text from "./Text"

const PersonalItem = ({children}:{children: ReactNode}) =>(
  <li className="flex flex-col">
    {children}
  </li>
)


const Personal = ()=> {
  return (
    <ul className="flex flex-col gap-3">
      <PersonalItem>
        <Text variant="light">Site</Text>
        <Text variant="standard">website.com</Text>
      </PersonalItem>
      <PersonalItem>
        <Text variant="light">Github</Text>
        <Text variant="standard">website.com</Text>
      </PersonalItem>
      <PersonalItem>
        <Text variant="light">Linkedin</Text>
        <Text variant="standard">website.com</Text>
      </PersonalItem>
    </ul>
  )
}

export default Personal