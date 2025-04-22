interface totalProps {
  totalExercises: number,
}

const Total = (props: totalProps) => {
  return (
    <p>Number of exercises {props.totalExercises}</p>
	)
}

export default Total
