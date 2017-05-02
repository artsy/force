import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'

export default function TextInput ({ item, label, instructions }) {
  const b = block('consignments2-submission-text-input')

  return (
    <div className={b()}>
      { label && <div className={b('label')}>{ label }</div> }
      { instructions && <div className={b('instructions')}>{ instructions }</div> }
      <input data={item} className={b('input').mix('bordered-input')} />
    </div>
  )
}

TextInput.propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  instructions: PropTypes.string
}
