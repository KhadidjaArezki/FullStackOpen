import express from 'express';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if ( !daily_exercises || !daily_exercises instanceof Array ||
       !target || isNaN(Number(target))) {
    return res.status(400).send({ error: 'parameters missing'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (daily_exercises.length == 0) {
    return res.status(400).send({ error: 'parameters missing'});
  }
  const dailyExerciseHours: number[] = [];
  for (const d of daily_exercises) {
    if (isNaN(Number(d))) {
      return res.status(400).send({ error: 'malformatted parameters'});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    dailyExerciseHours.push(d);
  }
    
  const result = calculateExercises(dailyExerciseHours, Number(target));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

