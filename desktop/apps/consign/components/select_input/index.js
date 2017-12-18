import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import { map } from 'underscore'

export const renderSelectInput = ({ input, ...custom }) => (
  <SelectInput
    {...custom}
    value={input.value}
    onChange={input.onChange}
  />
)

function SelectInput (props) {
  const {
    item,
    label,
    onChange,
    options,
    value
  } = props
  const b = block('consignments-submission-select-input')
  return (
    <div className={b({item})}>
      { label && <div className={b('label')}>{ label }</div> }
      <label className={b.builder()('select').mix('bordered-select')}>
        <select defaultValue={value} onChange={onChange}>
          {
            map(options, (option) => {
              return (
                <option key={option}>
                  { option }
                </option>
              )
            })
          }
        </select>
      </label>
    </div>
  )
}

SelectInput.propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  value: PropTypes.string
}
