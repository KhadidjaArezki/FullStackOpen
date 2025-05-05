import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Diagnosis, Patient, Entry } from '../../types'
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry"
import NewEntryForm from "./NewEntryForm"
import { useEffect, useRef, useState } from "react";

interface Props {
  patients: Patient[]
  diagnoses: Diagnosis[]
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
    default:
      return assertNever(entry)
  }
}

const PatientInfo = ({ patients, diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState({} as Patient)

  useEffect(() => {
    (async () => {
      setPatient(patients.find(p => p.id === id) ?? {} as Patient)
    })()
  }, [patients])

  const onAddedEntry = (newEntry: Entry) => {
    setPatient({
      ...patient,
      entries: patient.entries.concat(newEntry)
    })
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <h3>{patient.name}</h3>
      {patient.gender === "female" ? <FemaleIcon /> : patient.gender === "male" ? <MaleIcon /> : <TransgenderIcon />}
    </div>
    <div>occupation: {patient.occupation}</div>
    {patient.entries?.length > 0 && <h4>entries</h4>}
    {patient.entries?.map((entry) => (
      <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
    ))}
    <NewEntryForm id={patient.id} onAddedEntry={onAddedEntry} diagnoses={diagnoses} />
  </div>
}

export default PatientInfo
