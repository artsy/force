import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { map } from 'underscore'

export default function RadioInput ({ item, label, options, selectedOption }) {
  const b = block('consignments2-submission-radio-input')
  const selected = selectedOption || options[0]

  return (
    <div className={b()}>
      <div className={b('label')}>
        { label }
      </div>
      <div className={b('radio-buttons')}>
        {
          map(options, (option) => {
            return (
              <div className={b('radio-button')} key={`${item}_${option}`}>
                <input
                  className={b('button')}
                  type='radio'
                  name={item}
                  value={option}
                  onChange={() => {}} // necessary to get around warning
                />
                <div className={b('button-control', { checked: option === selected })} />
                <label className={b('button-label')}>{option}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

RadioInput.propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string
}
