import Part from './Part'
import { CoursePart } from './App'

const Content = (props: CoursePart[]) => {
  const { parts } = props
  return <>
    {parts.map((part) => <Part key={part.name} part={part} />)}
  </>
}

export default Content
