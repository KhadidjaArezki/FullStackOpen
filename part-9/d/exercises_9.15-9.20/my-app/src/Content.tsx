type part = {
  name: string,
  exerciseCount: number
}
interface contentProps {
  parts: part[],
}

const Content = (props: contentProps) => {
  const { parts } = props
  return (
	  <>
		  <p>
        {parts[0].name} {parts[0].exerciseCount}
      </p>
      <p>
        {parts[1].name} {parts[1].exerciseCount}
      </p>
      <p>
        {parts[2].name} {parts[2].exerciseCount}
      </p>
		</>
	)
}

export default Content
