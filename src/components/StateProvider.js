import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext()

const StateProvider = ({children, reducer, initialState}) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
  )
}

export default StateProvider

export const useStateValue =  ()=> useContext(StateContext)