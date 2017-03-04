import { default as React, PropTypes } from 'react';

export default function BasicCheckbox({ item, onClickAction, checked, onClick }) {
  return (
    <div className={'auction2-basic-checkbox'}>
      <div className={'artsy-checkbox'} onClick={() => onClick(item.id)}>
        <div className={'artsy-checkbox--checkbox'}>
          <input
            type='checkbox'
            name='artistAggregation'
            value={item.id}
            checked={checked}
            onChange={() => {}} // necessary to get around warning
          />
          <label htmlFor={item.id} />
        </div>
        <label className={'artsy-checkbox--label'} htmlFor={item.id}>
          { item.name }
        </label>
      </div>
    </div>
  )
}
