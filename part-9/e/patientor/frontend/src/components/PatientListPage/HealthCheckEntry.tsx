import { Diagnosis, HealthCheckEntry as HCEntry, HealthCheckRating } from "../../types"
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

interface Props {
  entry: HCEntry,
  diagnoses: Diagnosis[],
}

const styles = {
  border: '1px solid',
  borderRadius: '7px',
  padding: '7px',
  marginBottom: '7px',
}

const showHealthCheckRating = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy: return <FavoriteSharpIcon style={{ color: 'green' }} />
    case HealthCheckRating.LowRisk: return <FavoriteSharpIcon style={{ color: 'yellow' }} />
    case HealthCheckRating.HighRisk: return <FavoriteSharpIcon style={{ color: 'orange' }} />
    case HealthCheckRating.CriticalRisk: return <FavoriteSharpIcon style={{ color: 'red' }} />
  }
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div key={entry.id} style={styles}>
      <p>{entry.date} {<MedicalInformationIcon />}</p>
      <p><i>{entry.description}</i></p>
      {showHealthCheckRating(entry.healthCheckRating)}
      {entry.diagnosisCodes && <ul>
        {entry.diagnosisCodes.map((dc) => <li key={dc}>{dc} {diagnoses.find((d) => d.code === dc)?.name}</li>)}
      </ul>}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  )
}

export default HealthCheckEntry
