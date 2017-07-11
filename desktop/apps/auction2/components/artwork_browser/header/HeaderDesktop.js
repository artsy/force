import FilterSort from './FilterSort'
import Grid from '../../../../../components/main_layout/public/icons/grid.svg'
import List from '../../../../../components/main_layout/public/icons/list.svg'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { toggleListView } from 'desktop/apps/auction2/actions/filter'

function Header (props) {
  const {
    toggleListViewAction,
    totalLabel,
    displayType
  } = props

  const b = block('auction2-artworks-header-desktop')

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

Header.propTypes = {
  displayType: PropTypes.string.isRequired,
  toggleListViewAction: PropTypes.func.isRequired,
  totalLabel: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  const {
    isFetchingArtworks,
    isListView,
    total
  } = state.auctionArtworks

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
)(Header)

// Helpers

function displayButtonClass (buttonType, displayType) {
  return classNames(
    `auction2-artworks-header__${buttonType}`,
    { active: displayType === buttonType }
  )
}
