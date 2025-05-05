import { v1 as uuid } from 'uuid'
import patients from '../../data/patients';
import {
  NewPatientEntry,
  PatientEntry,
  NonSensitivePatientEntry,
  Entry,
  NewEntry,
} from '../types';

const getPatientsEntries = (): PatientEntry[] => {
  return patients;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  if (entry) return {
    ...entry,
    entries: entry.entries,
  }
  return entry
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
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

const addEntry = (patient: PatientEntry, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  }
  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry)
  }
  const patientIndex = patients.findIndex((p) => p.id === patient.id)
  if (patientIndex !== -1) {
    patients[patientIndex] = updatedPatient
  }
  return newEntry
}

export default {
  getPatientsEntries,
  getNonSensitivePatientEntries,
  addPatient,
  addEntry,
  findById,
}
