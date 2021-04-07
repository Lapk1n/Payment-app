import React, { useReducer, useContext, ReactNode } from 'react'
import { reducer } from './alertReducer'
import { IAlertContext, initType } from '../interfaces'
import {
  SHOW_PAYMENT_SUCCESS,
  SHOW_PAYMENT_FAIL,
  HIDE_PAYMENT,
  SHOW_LOADER,
  HIDE_LOADER,
} from './types'

const AlertContext = React.createContext<Partial<IAlertContext>>({})

export const useAlertContext = () => {
  return useContext(AlertContext)
}

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const initialState: initType = {
    loading: false,
    visible: false,
    value: '',
    title: '',
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const showLoader = () => dispatch({ type: SHOW_LOADER })
  const hideLoader = () => dispatch({ type: HIDE_LOADER })
  const showAlertSuccess = () => dispatch({ type: SHOW_PAYMENT_SUCCESS })
  const showAlertFail = () => dispatch({ type: SHOW_PAYMENT_FAIL })
  const hideAlert = () => dispatch({ type: HIDE_PAYMENT })

  return (
    <AlertContext.Provider
      value={{
        showLoader,
        hideLoader,
        showAlertSuccess,
        showAlertFail,
        hideAlert,
        value: state.value,
        title: state.title,
        loading: state.loading,
        visible: state.visible,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider
