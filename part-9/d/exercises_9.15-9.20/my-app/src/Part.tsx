import { CoursePart } from './App'
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
  const { part } = props
  switch (part.kind) {
    case 'basic':
      return (<>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p>
          {part.description}
        </p>
      </>)
    case 'group':
      return (<>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p>
          project exercises: {part.groupProjectCount}
        </p>
      </>)
    case 'background':
      return (<>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p>{part.description}</p>
        submit to: {part.backgroundMaterial}
      </>)
    case 'special':
      return (<>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p>
          <p>{part.description}</p>
          required skills: {part.requirements.join(',')}
        </p>
      </>)
    default:
      return assertNever(part);
  }
}

export default Part;
