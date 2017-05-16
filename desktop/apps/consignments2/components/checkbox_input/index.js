import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'

export default function CheckboxInput (props) {
  const { item, label, onClick, selected } = props
  const b = block('consignments2-submission-checkbox-input')

  return (
    <div className={b('wrapper').mix('artsy-checkbox')} onClick={() => onClick()}>
      <div className={b('input').mix('artsy-checkbox--checkbox')}>
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
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
}
