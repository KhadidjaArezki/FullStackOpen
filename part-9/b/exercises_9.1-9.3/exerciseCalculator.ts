type ratingType = 1 | 2 | 3;

interface ExersiceStats {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: ratingType,
  ratingDescription: string
}

const calculateExercises = (dailyExerciseHours: number[], target: number): ExersiceStats => {
  let average: number = dailyExerciseHours.reduce((acc, next) => acc+ next) / dailyExerciseHours.length
  let trainingDays: number = dailyExerciseHours.reduce((acc, next) => next == 0? acc: acc+1, 0)
  let rating: ratingType = average >= target ? 3: average >= target*0.75 ? 2 : 1
  
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: average >= target,
    rating: rating,
    ratingDescription: rating == 3? 'Excellent': rating == 2? 'Almost there': 'Need to put in more effort'
  }
}

interface MultiplyValues {
  value1: number;
  value2: number[];
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  let allNumbers: boolean = args.slice(3).every(num => !isNaN(Number(num)))
  if (!isNaN(Number(args[2])) && allNumbers) {
    return {
      value1: Number(args[2]),
      value2: args.slice(3).map(num => Number(num))
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(`Training Stats: ${JSON.stringify(calculateExercises(value2, value1), null, 2)}`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
