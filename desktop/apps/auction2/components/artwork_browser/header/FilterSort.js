import _ from 'underscore'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { updateSort } from 'desktop/apps/auction2/actions/artworkBrowser'

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

  const b = block('auction2-filter-sort')

  return (
    <div className={b()}>
      <span className={b('label').mix('bordered-pulldown-label')}>Sort by:</span>
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
                onClick={(event) => {
                  event.preventDefault()
                  updateSortAction(sort)
                }}
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
    sortMap: state.artworkBrowser.sortMap,
    filterParams: state.artworkBrowser.filterParams
  }
}

const mapDispatchToProps = {
  updateSortAction: updateSort
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSort)
