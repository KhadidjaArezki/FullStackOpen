import React from 'react'
import { useContext } from 'react'
import CounterContext from '../CounterContext'
import { useCounterValue } from '../CounterContext'

const Display = () => {
  const counter = useCounterValue()
  return <div>{counter}</div>
}

export default Display
