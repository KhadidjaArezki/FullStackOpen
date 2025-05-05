import express from 'express'
import { z } from 'zod'
import patientService from '../services/patientService'
import { NewPatientEntrySchema, NewEntrySchema } from '../utils'

const newPatientParser = (req: any, _res: any, next: any) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
const newEntryParser = (req: any, _res: any, next: any) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: any, res: any, next: any) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', newPatientParser, (req: any, res: any) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
})

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/:id/entries', newEntryParser, (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (!patient) {
    res.sendStatus(404);
  } else {
    const addedEntry = patientService.addEntry(patient, req.body)
    res.send(addedEntry);
  }
})

router.use(errorMiddleware);

export default router
