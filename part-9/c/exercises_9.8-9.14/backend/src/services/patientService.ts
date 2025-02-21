import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getPatientsEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
};

export default {
  getPatientsEntries,
  getNonSensitivePatientEntries,
}
