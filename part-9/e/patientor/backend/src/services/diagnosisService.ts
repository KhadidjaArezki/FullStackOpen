import diagnoses from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

const getDiognosesEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getDiognosesEntries,
}
