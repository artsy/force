import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'

export const renderTextInput = ({ input: { onChange, value }, meta: { warning }, ...custom }) => (
  <TextInput
    {...custom}
    value={value}
    onChange={onChange}
    warning={warning}
  />
)

function TextInput (props) {
  const { autofocus, item, label, instructions, onChange, type, warning, value, ...rest } = props
  const b = block('consignments2-submission-text-input')

  return (
    <div className={b()}>
      { label && <div className={b('label')}>{ label }</div> }
      { instructions && <div className={b('instructions')}>{ instructions }</div> }
      <input
        autoFocus={autofocus}
        data={item}
        className={b('input').mix('bordered-input')}
        type={type || 'text'}
        onKeyUp={(e) => onChange(e.target.value)}
        defaultValue={value}
      />
      {warning && <div className={b('warning')}>{warning}</div>}
    </div>
  )
}

TextInput.propTypes = {
  autofocus: PropTypes.bool,
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  instructions: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  warning: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
