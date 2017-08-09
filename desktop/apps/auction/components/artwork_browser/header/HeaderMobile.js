import _ from 'underscore'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { toggleListView, updateSort } from 'desktop/apps/auction2/actions/artworkBrowser'

const propTypes = {
  sortMap: PropTypes.object.isRequired,
  totalLabel: PropTypes.string.isRequired,
  updateSortAction: PropTypes.func.isRequired
}

function HeaderMobile (props) {
  const {
    sortMap,
    totalLabel,
    updateSortAction
  } = props

  const b = block('auction2-artworks-HeaderMobile')

  return (
    <header className={b()}>
      <div className={b('total')}>
        <em>
          {totalLabel}
        </em>
      </div>

      <div className={b('sort')}>
        <select
          dir='rtl'
          onChange={(event) => updateSortAction(event.target.value)}
        >
          {
            _.map(sortMap, (sortName, sort) => {
              return (
                <option value={sort} key={sort}>
                  {sortName}
                </option>
              )
            })
          }
        </select>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  const {
    filterParams,
    isFetchingArtworks,
    sortMap,
    total
  } = state.artworkBrowser

  const selectedSort = filterParams.sort

  const totalLabel = isFetchingArtworks
    ? 'Loading...'
    : `${total} Lots`

  return {
    filterParams,
    selectedSort,
    sortMap: { default: 'Default', ...sortMap },
    totalLabel
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSortAction: (sortValue) => {
    if (sortValue === 'default') {
      dispatch(toggleListView(false))
      dispatch(updateSort('position')) // default
    } else {
      dispatch(toggleListView(true))
      dispatch(updateSort(sortValue))
    }
  }
})

HeaderMobile.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderMobile)
