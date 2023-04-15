import React from 'react'
import { createContext, useReducer, useContext } from 'react'

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
        return state + 1
    case "DEC":
        return state - 1
    case "ZERO":
        return 0
    default:
        return state
  }
}

// A context is an application's global state
const CounterContext = createContext()

/**
 * The useReducer hook provides a mechanism to create a state for an application.
 * It takes two parameters: 
 * 1. the reducer function - for creating state and handling state changes
 * 2. the initial value of the state
 *
 * useReducer returns an array that contains two elements:
 * 1. the current value of the state,
 * 2. the dispatch function to change the state
 */
 
export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch] }>
      {props.children}
    </CounterContext.Provider>
  )
}

export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[1]
}

export default CounterContext

