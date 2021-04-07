import {
  SHOW_PAYMENT_SUCCESS,
  SHOW_PAYMENT_FAIL,
  HIDE_PAYMENT,
  SHOW_LOADER,
  HIDE_LOADER,
} from './types'
import { initType, actionType } from '../interfaces'

export const reducer = (state: initType, action: actionType) => {
  switch (action.type) {
    case SHOW_PAYMENT_SUCCESS:
      return {
        ...state,
        visible: true,
        value: 'success',
        title: 'Платеж выполнен!',
      }

    case SHOW_PAYMENT_FAIL:
      return {
        ...state,
        visible: true,
        value: 'danger',
        title: 'Платеж не выполнен!',
      }
    case HIDE_PAYMENT:
      return { ...state, visible: false }
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    default:
      return state
  }
}
