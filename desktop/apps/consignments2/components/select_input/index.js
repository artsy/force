import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { map } from 'underscore'

export const renderSelectInput = ({ input, ...custom }) => (
  <SelectInput
    value={input.value}
    onChange={input.onChange}
    {...custom}
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
  const b = block('consignments2-submission-select-input')

  return (
    <div className={b({item})}>
      { label && <div className={b('label')}>{ label }</div> }
      <div className={b('select').mix('bordered-pulldown')}>
        <a className='bordered-pulldown-toggle' href='#'>
          <span className='bordered-pulldown-text'>{ value || options[0] }</span>
          <div className='bordered-pulldown-toggle-caret'>
            <span className='caret' />
          </div>
        </a>
        <div className='bordered-pulldown-options'>
          {
            map(options, (option) => {
              return (
                <a
                  href='#'
                  className='bordered-pulldown-active'
                  key={option}
                  onClick={() => onChange(option)}
                >{ option }</a>
              )
            })
          }
        </div>
      </div>
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
