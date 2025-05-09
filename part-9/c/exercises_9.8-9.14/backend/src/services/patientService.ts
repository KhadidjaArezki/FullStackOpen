import { v1 as uuid } from 'uuid'
import patients from '../../data/patients';
import {
  NewPatientEntry,
  PatientEntry,
  NonSensitivePatientEntry
} from '../types';

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
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
}

export default {
  getPatientsEntries,
  getNonSensitivePatientEntries,
  addPatient,
}
