import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { map } from 'underscore'

export const renderRadioInput = ({ input, ...custom }) => (
  <RadioInput
    {...custom}
    value={input.value}
    onChange={input.onChange}
  />
)

function RadioInput (props) {
  const { item, label, onChange, options, value } = props
  const b = block('consignments2-submission-radio-input')

  return (
    <div className={b()}>
      <div className={b('label')}>
        { label }
      </div>
      <div className={b('radio-buttons')}>
        {
          map(options, (option) => {
            return (
              <div className={b('radio-button')} key={`${item}_${option}`} onClick={() => onChange(option)}>
                <input
                  className={b('button')}
                  type='radio'
                  name={item}
                  value={option}
                />
                <div className={b('button-control', { checked: option === value })} />
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
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}
