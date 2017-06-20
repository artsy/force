import _ from 'underscore'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { updateSort } from 'desktop/apps/auction2/client/actions'

function FilterSort (props) {
  const {
    filterParams,
    sortMap,
    updateSortAction
  } = props

  const selectedSort = filterParams.sort
  const itemHeight = 37
  const itemIndex = Object.keys(sortMap).indexOf(selectedSort)
  const optionsOffset = (itemIndex) * itemHeight

  return (
    <div className='auction-filter-sort'>
      <span className='auction-filter-sort__label bordered-pulldown-label'>Sort by:</span>
      <div className='bordered-pulldown'>
        <a className='bordered-pulldown-toggle' href='#'>
          <span className='bordered-pulldown-text'>{ sortMap[selectedSort] }</span>
          <div className='bordered-pulldown-toggle-caret'>
            <span className='caret' />
          </div>
        </a>
        <div className='bordered-pulldown-options' style={{ top: -optionsOffset }}>
          {
            _.map(sortMap, (sortName, sort) => {
              const selected = sort === selectedSort
              return <a
                href='#'
                className={selected ? 'borderd-pulldown-active' : ''}
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

FilterSort.propTypes = {
  filterParams: PropTypes.object.isRequired,
  sortMap: PropTypes.object.isRequired,
  updateSortAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    sortMap: state.auctionArtworks.sortMap,
    filterParams: state.auctionArtworks.filterParams
  }
}

const mapDispatchToProps = {
  updateSortAction: updateSort
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSort)
