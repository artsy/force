import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'

export const renderTextInput = ({ input: { onChange, value }, meta: { error, touched, warning }, ...custom }) => (
  <TextInput
    {...custom}
    value={value}
    onChange={onChange}
    warning={warning}
    touched={touched}
    error={error}
  />
)

function TextInput (props) {
  const {
    autofocus,
    error,
    item,
    label,
    instructions,
    onChange,
    touched,
    type,
    warning,
    value
  } = props

  const b = block('consignments-submission-text-input')
  return (
    <div className={b({error: Boolean(touched && error)})} name={item}>
      { label && <div className={b('label')}>{ label }</div> }
      { instructions && <div className={b('instructions')}>{ instructions }</div> }
      <input
        autoFocus={autofocus}
        data={item}
        className={b.builder()('input').mix('bordered-input')()}
        type={type || 'text'}
        onKeyUp={(e) => onChange(e.target.value)}
        defaultValue={value}
      />
      {
        touched && (
          (warning && <div className={b('warning')}>{warning}</div>) ||
          (error && <div className={b('error')}>{error}</div>)
        )
      }
    </div>
  )
}

TextInput.propTypes = {
  autofocus: PropTypes.bool,
  error: PropTypes.string,
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  instructions: PropTypes.string,
  onChange: PropTypes.func,
  touched: PropTypes.bool,
  type: PropTypes.string,
  warning: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
