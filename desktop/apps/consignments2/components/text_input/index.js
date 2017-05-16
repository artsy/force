import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'

export default function TextInput (props) {
  const { item, label, instructions, onKeyUp, value } = props
  const b = block('consignments2-submission-text-input')

  return (
    <div className={b()}>
      { label && <div className={b('label')}>{ label }</div> }
      { instructions && <div className={b('instructions')}>{ instructions }</div> }
      <input
        data={item}
        className={b('input').mix('bordered-input')}
        onKeyUp={(e) => onKeyUp(e.target.value)}
        type='text'
      />
    </div>
  )
}

TextInput.propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  instructions: PropTypes.string,
  onKeyUp: PropTypes.func.isRequired,
  value: PropTypes.string
}
