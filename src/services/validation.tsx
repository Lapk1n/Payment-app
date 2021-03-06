import { useFormik } from 'formik'
import { useAlertContext } from '../context/AlertContext'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ValuesType } from '../interfaces'

const url = process.env.REACT_APP_DB_URL

const initialValues: ValuesType = {
  number: '',
  amount: '',
  loading: false,
}

const validationSchema = Yup.object({
  number: Yup.string()
    .min(16, 'Некорректный номер')
    .required('Обязательное поле'),
  amount: Yup.number()
    .min(1, 'Сумма не менее 1')
    .max(1000, 'Сумма не более 1000')
    .required('Обязательное поле'),
})

export const useValidation = () => {
  const history = useHistory()
  const handleHistory = () => {
    history.push('/')
  }

  const {
    showLoader,
    hideLoader,
    showAlertSuccess,
    showAlertFail,
    hideAlert,
  } = useAlertContext()

  const onSubmit = async (value: ValuesType) => {
    showLoader!()
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('')
          } else {
            reject()
          }
        }, 2500)
      })

      const data = {
        ...value,
        date: new Date().toJSON(),
      }
      await axios.post(`${url}/data.json`, data)
      showAlertSuccess!()
      setTimeout(() => handleHistory(), 2000)
    } catch (e) {
      showAlertFail!()
    } finally {
      setTimeout(() => hideLoader!())
    }
    setTimeout(() => hideAlert!(), 1500)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })
  return formik
}
