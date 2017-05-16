import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { map } from 'underscore'

export default function RadioInput (props) {
  const { item, label, onClick, options, selected } = props
  const b = block('consignments2-submission-radio-input')

  return (
    <div className={b()}>
      <div className={b('label')}>
        { label }
      </div>
      <div className={b('radio-buttons')}>
        {
          map(options, (option, optionLabel) => {
            return (
              <div className={b('radio-button')} key={`${item}_${option}`} onClick={() => onClick(option)}>
                <input
                  className={b('button')}
                  type='radio'
                  name={item}
                  value={option}
                />
                <div className={b('button-control', { checked: option === selected })} />
                <label className={b('button-label')}>{optionLabel}</label>
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
  onClick: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  selected: PropTypes.bool
}
