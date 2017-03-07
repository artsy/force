import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import _ from 'underscore'
import { updateSort } from '../../actions'

function FilterSort({ sortMap, filterParams, updateSortAction }) {
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
                onClick={() => updateSortAction(sort)}
              >{sortName}</a>
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sortMap: state.auctionArtworks.sortMap,
    filterParams: state.auctionArtworks.filterParams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSortAction: (sort) => dispatch(updateSort(sort))
  }
}

const FilterSortContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSort)

export default FilterSortContainer
