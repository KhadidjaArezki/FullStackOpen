import express from 'express';
import { z } from 'zod';
import diaryService from '../services/diaryService';
import NewEntrySchema from '../utils';
//import { NewDiaryEntry } from '../types'

const newDiaryParser = (req: any, _res: any, next: any) => { 
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
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newDiaryParser, (req: any, res: any) => {
  const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
