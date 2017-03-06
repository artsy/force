import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import _ from 'underscore'

export default function FilterSort({ sortMap, filterParams, onClick }) {
  const selectedSort = filterParams.sort
  return (
    <div className='auction2-filter-sort'>
      <span className='auction2-filter-sort__label bordered-pulldown-label'>Sort by:</span>
      <div className='bordered-pulldown'>
        <a className='bordered-pulldown-toggle' href='#'>
          <span className='bordered-pulldown-text'>{ sortMap[selectedSort] }</span>
          <div className='bordered-pulldown-toggle-caret'>
            <span className='caret'></span>
          </div>
        </a>
        <div className='bordered-pulldown-options'>
          {
            _.map(sortMap, (sortName, sort) => {
              const selected = sort == selectedSort
              return <a
                href='#'
                className={ selected ? 'borderd-pulldown-active' : '' }
                key={sort}
                onClick={() => onClick(sort)}
              >{sortName}</a>
            })
          }
        </div>
      </div>
    </div>
  )
}
