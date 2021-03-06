import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { CSSTransition } from 'react-transition-group'
import { useAlertContext } from '../../context/AlertContext'
import { css } from 'aphrodite'
import styles from './stylesheet'

const AlertMessage = () => {
  const { visible, hideAlert, value, title } = useAlertContext()
  const removeAlert = hideAlert

  return (
    <CSSTransition
      classNames="alert"
      in={visible}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <Alert
        onClick={removeAlert}
        className={css(styles.alert)}
        variant={value || 'danger'}
      >
        <Alert.Heading className={css(styles.heading)}>
          {title || 'Placeholder!'}
        </Alert.Heading>

        <button
          onClick={() => removeAlert}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></button>
      </Alert>
    </CSSTransition>
  )
}

export default AlertMessage
