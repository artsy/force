import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'

export const renderTextInput = ({ input, ...custom }) => (
  <TextInput
    {...custom}
    value={input.value}
    onChange={input.onChange}
  />
)

function TextInput (props) {
  const { item, label, instructions, onChange, type } = props
  const b = block('consignments2-submission-text-input')

  return (
    <div className={b()}>
      { label && <div className={b('label')}>{ label }</div> }
      { instructions && <div className={b('instructions')}>{ instructions }</div> }
      <input
        data={item}
        className={b('input').mix('bordered-input')}
        type={type || 'text'}
        onKeyUp={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

TextInput.propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  instructions: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
}
