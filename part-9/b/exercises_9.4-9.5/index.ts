import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let args: string[] = []
  if (req.query.height) args.push(req.query.height.toString())
  if (req.query.weight) args.push(req.query.weight.toString())
  try {  
    const { value1, value2 } = parseArguments(args)
    res.json({
      weight: value2,
      height: value1,
      bmi: calculateBmi(value1, value2)
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
       res.status(400).send({
         error: "malformatted parameters"
       })
    }
  }
});


const PORT = 3008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

