import express from 'express';
import dignosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(dignosisService.getDiognosesEntries());
});

export default router
