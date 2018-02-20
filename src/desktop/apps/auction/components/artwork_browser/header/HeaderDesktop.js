import FilterSort from './FilterSort'
import Grid from '../../../../../components/main_layout/public/icons/grid.svg'
import List from '../../../../../components/main_layout/public/icons/list.svg'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { toggleListView } from 'desktop/apps/auction/actions/artworkBrowser'

function HeaderDesktop (props) {
  const {
    toggleListViewAction,
    totalLabel,
    displayType
  } = props

  const b = block('auction-artworks-HeaderDesktop')

  const displayButtonClass = (buttonType, displayType) => {
    return classNames(
      String(b(buttonType)),
      { active: displayType === buttonType }
    )
  }

  return (
    <div className={b()}>
      <div className={b('left')}>
        <div className={b('total')}>
          { totalLabel }
        </div>
      </div>
      <div className={b('right')}>
        <div className={b('sort')}>
          <FilterSort />
        </div>
        <div className={b('switch')}>
          <div className={displayButtonClass('grid', displayType)} onClick={() => toggleListViewAction(false)}>
            <Grid />
          </div>
          <div className={displayButtonClass('list', displayType)} onClick={() => toggleListViewAction(true)}>
            <List />
          </div>
        </div>
      </div>
    </div>
  )
}

HeaderDesktop.propTypes = {
  displayType: PropTypes.string.isRequired,
  toggleListViewAction: PropTypes.func.isRequired,
  totalLabel: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const {
    isFetchingArtworks,
    isListView,
    total
  } = state.artworkBrowser

  const displayType = isListView ? 'list' : 'grid'

  const totalLabel = isFetchingArtworks
    ? 'Loading results.'
    : `${total} Artworks`

  return {
    displayType,
    totalLabel
  }
}

const mapDispatchToProps = {
  toggleListViewAction: toggleListView
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDesktop)

// Helpers
