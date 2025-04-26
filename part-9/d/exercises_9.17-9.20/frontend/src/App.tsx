import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry, Visibility, Weather } from './types'
import { getAllDiaries, createDiary } from './diaryService'

const App = () => {
  const [newDiaryDate, setNewDiaryDate] = useState('')
  const [newDiaryWeather, setNewDiaryWeather] = useState('')
  const [newDiaryVisibility, setNewDiaryVisibility] = useState('')
  const [newDiaryComment, setNewDiaryComment] = useState('')
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (errMsg) {
      setTimeout(() => {
        setErrMsg('')
      }, 5000)
    }
  }, [errMsg])

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    // Validate or cast newDiaryWeather to Weather
    if (!Object.values(Weather).includes(newDiaryWeather as Weather)) {
      setErrMsg(`Error: Invalid weather type`);
      return;
    }
    if (!Object.values(Visibility).includes(newDiaryVisibility as Visibility)) {
      setErrMsg('Invalid Visibility type')
      return;
    }
    createDiary({
      date: newDiaryDate,
      weather: newDiaryWeather as Weather,
      visibility: newDiaryVisibility as Visibility,
      comment: newDiaryComment,
    }).then(data => {
      setDiaries(diaries.concat(data))
    }).catch(error => {
      setErrMsg(
        `Error: Incorrect ${error.response.data.error[0].path.join(
          ','
        )}: ${error.response.data.error[0].received}`)
    })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <p className="error">{errMsg}</p>
      <form onSubmit={diaryCreation}>
        <div>
          <fieldset>
            <label className='field' >date:</label>
            <input
              type="date"
              value={newDiaryDate}
              onChange={(event) => setNewDiaryDate((event.target as HTMLInputElement).value)}
            />
          </fieldset>
        </div>
        <div>
          <fieldset>
            <label className='field'>weather:</label>
            <span className='radio-choice'>
              <label>sunny</label>
              <input
                type="radio"
                name='weather'
                value="sunny"
                onClick={(event) => setNewDiaryWeather((event.target as HTMLInputElement).value)}
              />
            </span>
            <span className='radio-choice'>
              <label>rainy</label>
              <input
                type="radio"
                name='weather'
                value="rainy"
                onClick={(event) => setNewDiaryWeather((event.target as HTMLInputElement).value)}
              />
            </span>
            <span className='radio-choice'>
              <label>cloudy</label>
              <input
                type="radio"
                name='weather'
                value="cloudy"
                onClick={(event) => setNewDiaryWeather((event.target as HTMLInputElement).value)}
              />
            </span>
            <span className='radio-choice'>
              <label>stormy</label>
              <input
                type="radio"
                name='weather'
                value="stormy"
                onClick={(event) => setNewDiaryWeather((event.target as HTMLInputElement).value)}
              />
            </span>
            <span className='radio-choice'>
              <label>windy</label>
              <input
                type="radio"
                name='weather'
                value="windy"
                onClick={(event) => setNewDiaryWeather((event.target as HTMLInputElement).value)}
              />
            </span>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <label className='field'>visibility:</label>
            <span className='radio-choice'>
              <label>great</label>
              <input
                type="radio"
                name='visibility'
                value="great"
                onClick={(event) => setNewDiaryVisibility((event.target as HTMLInputElement).value)}
              />
            </span>
            <span className='radio-choice'>
              <label>good</label>
              <input
                type="radio"
                name='visibility'
                value="good"
                onClick={(event) => setNewDiaryVisibility((event.target as HTMLInputElement).value)}
              />
            </span>
            <span className='radio-choice'>
              <label>ok</label>
              <input
                type="radio"
                name='visibility'
                value="ok"
                onClick={(event) => setNewDiaryVisibility((event.target as HTMLInputElement).value)}
              />
            </span>
            <span className='radio-choice'>
              <label>poor</label>
              <input
                type="radio"
                name='visibility'
                value="poor"
                onClick={(event) => setNewDiaryVisibility((event.target as HTMLInputElement).value)}
              />
            </span>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <label className='field'>comment:</label>
            <input
              value={newDiaryComment}
              onChange={(event) => setNewDiaryComment((event.target as HTMLInputElement).value)}
            />
          </fieldset>
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary Entries</h2>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            <h4>{diary.date}</h4>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
