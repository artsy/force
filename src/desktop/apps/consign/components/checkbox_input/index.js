import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'

export const renderCheckboxInput = ({
  input: { onChange, value },
  meta: { error, touched },
  ...custom
}) => (
  <CheckboxInput
    {...custom}
    value={value}
    onChange={onChange}
    error={error}
    touched={touched}
  />
)

export default function CheckboxInput(props) {
  const { error, item, label, onChange, touched, value } = props
  const b = block('consignments-submission-checkbox-input')

  return (
    <div
      className={b
        .builder()('wrapper', { error: Boolean(touched && error) })
        .mix('artsy-checkbox')()}
      onClick={() => onChange(!value)}
    >
      <div
        className={b
          .builder()('input')
          .mix('artsy-checkbox--checkbox')()}
      >
        <input
          type="checkbox"
          name={item}
          value={item}
          checked={value || false}
          onChange={() => {}}
        />
        <label htmlFor={item} />
      </div>
      <label className={b('label')} htmlFor={item}>
        {label}
      </label>
      {touched && error && <div className={b('error')}>{error}</div>}
    </div>
  )
}

CheckboxInput.propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.any,
  onChange: PropTypes.func.isRequired,
}
