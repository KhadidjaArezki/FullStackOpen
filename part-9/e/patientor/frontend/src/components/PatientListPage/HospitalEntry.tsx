import { Diagnosis, HospitalEntry as HEntry } from "../../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HEntry,
  diagnoses: Diagnosis[],
}

const styles = {
  border: '1px solid',
  borderRadius: '7px',
  padding: '7px',
  marginBottom: '7px',
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div key={entry.id} style={styles}>
      <p>{entry.date} {<LocalHospitalIcon />}</p>
      <p><i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map((dc) => <li key={dc}>{dc} {diagnoses.find((d) => d.code === dc)?.name}</li>)}
      </ul>
      <p>diagnosed by {entry.specialist}</p>
      <p>patient was discharged on {entry.discharge.date} <i>{entry.discharge.criteria}</i></p>
    </div>
  )
}

export default HospitalEntry
