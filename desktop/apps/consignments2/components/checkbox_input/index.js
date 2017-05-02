import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'

export default function CheckboxInput ({ item, label, selected }) {
  const b = block('consignments2-submission-checkbox-input')

  return (
    <div className='artsy-checkbox'>
      <div className='artsy-checkbox--checkbox'>
        <input
          type='checkbox'
          name={item}
          value={item}
          checked={selected || false}
          onChange={() => {}} // necessary to get around warning
        />
        <label htmlFor={item} />
      </div>
      <label className={b('label')} htmlFor={item}>
        { label }
      </label>
    </div>
  )
}

CheckboxInput.propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  selected: PropTypes.bool
}
