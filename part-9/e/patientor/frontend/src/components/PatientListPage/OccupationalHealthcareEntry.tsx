import { Diagnosis, OccupationalHealthcareEntry as OHCEntry } from "../../types"
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OHCEntry,
  diagnoses: Diagnosis[],
}

const styles = {
  border: '1px solid',
  borderRadius: '7px',
  padding: '7px',
  marginBottom: '7px',
}

const OccupationalHealthCareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div key={entry.id} style={styles}>
      <p>{entry.date} {<WorkIcon />} {entry.employerName}</p>
      <p><i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map((dc) => <li key={dc}>{dc} {diagnoses.find((d) => d.code === dc)?.name}</li>)}
      </ul>
      <p>diagnosed by {entry.specialist}</p>
    </div>
  )
}

export default OccupationalHealthCareEntry
