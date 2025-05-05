import { SyntheticEvent, useState } from "react"
import { Button, TextField, Input, InputLabel, Select, OutlinedInput, MenuItem } from "@mui/material"
import Alert from '@mui/material/Alert'
import { BaseEntry, Diagnosis, Entry, EntryFormValues } from "../../types"
import patientService from "../../services/patients"
import axios from 'axios';

interface Props {
  id: string,
  onAddedEntry: (newEntry: Entry) => void,
  diagnoses: Diagnosis[],
}

const NewEntryFrom = ({ id, onAddedEntry, diagnoses }: Props) => {
  const [entryChoice, setEntryChoice] = useState('healthcheck')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState('')
  const [healthCheckRating, setHealthCheckRating] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [discharge, setDischarge] = useState({
    date: '',
    criteria: '',
  })
  const [sickLeave, setSickLeave] = useState({
    startDate: '',
    endDate: '',
  })
  const [errorMsg, setErrMsg] = useState('')

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault()
    const baseFormValues: Omit<BaseEntry, 'id'> = {
      description,
      date,
      specialist,
    }
    if (diagnosisCodes.length > 0) {
      baseFormValues.diagnosisCodes = diagnosisCodes.split(',')
    }
    let formValues: EntryFormValues;
    if (entryChoice === 'healthcheck') {
      formValues = {
        ...baseFormValues,
        type: 'HealthCheck',
        healthCheckRating: isNaN(parseInt(healthCheckRating)) ? -1 : parseInt(healthCheckRating)
      }

    } else if (entryChoice === 'hospital') {
      formValues = {
        ...baseFormValues,
        type: 'Hospital',
        discharge: discharge,
      }
    } else {
      formValues = {
        ...baseFormValues,
        type: 'OccupationalHealthcare',
        employerName: employerName,
      }
      if (sickLeave.startDate.length > 0 && sickLeave.endDate.length > 0) {
        formValues.sickLeave = sickLeave
      }
    }
    try {
      const newEntry = await patientService.createEntry(id, formValues)
      onAddedEntry(newEntry)
      setDescription('')
      setDate('')
      setSpecialist('')
      setDiagnosisCodes('')
      setHealthCheckRating('')
      setEmployerName('')
      setDischarge({ date: '', criteria: '' })
      setSickLeave({ startDate: '', endDate: '' })
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data) {
          console.log(e.response.data.error)
          setErrMsg(`Value of ${e.response.data.error[0].path.join(',')} incorrect ${e.response.data.error[0].received ?? ''}`)
        } else {
          setErrMsg("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setErrMsg("Unknown error");
      }
    }
  }

  const NewHealthCheckEntryFields: React.FC<{}> = () => {
    return <>
      <TextField
        label="HealthCheck rating"
        fullWidth
        value={healthCheckRating}
        required
        onChange={({ target }) => setHealthCheckRating(target.value)}
      />
    </>
  }
  const NewHospitalEntryFields: React.FC<{}> = () => {
    return <>
      <InputLabel>Discharge date</InputLabel>
      <Input
        type="date"
        fullWidth
        value={discharge.date}
        required
        onChange={({ target }) => setDischarge({ ...discharge, date: target.value })}
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={discharge.criteria}
        required
        onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })}
      />
    </>
  }
  const NewOccupationalHealthcareEntryField: React.FC<{}> = () => {
    return <>
      <TextField
        label="Employer Name"
        fullWidth
        value={employerName}
        required
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel>Sickleave start date</InputLabel>
      <Input
        type="date"
        fullWidth
        value={sickLeave.startDate}
        onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
      />
      <InputLabel>Sickleave end date</InputLabel>
      <Input
        type="date"
        fullWidth
        value={sickLeave.endDate}
        onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })}
      />

    </>
  }

  return <div style={{ margin: '48px 0' }}>
    {errorMsg && (
      <Alert severity="error" onClose={() => { setErrMsg('') }}>{errorMsg}</Alert>
    )}
    <div style={{ display: 'flex', gap: '8px', margin: '18px 0' }}>
      <Button variant="contained" color="secondary" onClick={() => setEntryChoice('healthcheck')}>
        New HealthCheck Entry
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setEntryChoice('hospital')}>
        New Hospital Entry
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setEntryChoice('occupational healthcare')}>
        New Occupational HealthCare Entry
      </Button>
    </div>
    <form onSubmit={addEntry} style={{ margin: '18px 0' }}>
      <TextField
        label="Description"
        fullWidth
        value={description}
        required
        onChange={({ target }) => setDescription(target.value)}
      />
      <InputLabel>Date</InputLabel>
      <Input
        type="date"
        fullWidth
        value={date}
        required
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        required
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <InputLabel>Diagnoses Codes</InputLabel>
      <Select
        multiple
        label="Diagnosis Codes"
        fullWidth
        value={diagnosisCodes.split(',')}
        input={<OutlinedInput label="Diagnoses Codes" />}
        onChange={({ target }) => setDiagnosisCodes([...target.value].join(','))}
      >{diagnoses.map((d) => (
        <MenuItem
          key={d.latin}
          value={d.code}
        >
          {d.code}
        </MenuItem>
      ))}
      </Select>
      {entryChoice === 'healthcheck'
        ? <NewHealthCheckEntryFields />
        : entryChoice === 'hospital'
          ? <NewHospitalEntryFields />
          : <NewOccupationalHealthcareEntryField />
      }
      <Button
        style={{ float: "right", margin: '8px 0' }}
        type="submit"
        variant="contained"
      >
        Add Entry
      </Button>
    </form>
  </div>
}

export default NewEntryFrom
