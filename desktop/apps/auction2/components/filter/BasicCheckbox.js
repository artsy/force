import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export default function BasicCheckbox (props) {
  const {
    checked,
    disabled,
    item,
    onClick
  } = props

  const checkboxClasses = classNames(
    'artsy-checkbox',
    { disabled }
  )

  return (
    <div className='auction2-basic-checkbox'>
      <div className={checkboxClasses} onClick={() => onClick(item.id)}>
        <div className='artsy-checkbox--checkbox'>
          <input
            type='checkbox'
            name='aggregation'
            value={item.id}
            checked={checked}
            onChange={() => {}} // necessary to get around warning
          />
          <label htmlFor={item.id} />
        </div>
        <label className='artsy-checkbox--label' htmlFor={item.id}>
          { item.name }
          { item.count !== undefined &&
            <span className='artsy-checkbox--count'>
              ({item.count})
            </span> }
        </label>
      </div>
    </div>
  )
}

BasicCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}
