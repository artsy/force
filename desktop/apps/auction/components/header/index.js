import { toggleListView, updateSort } from '../../client/actions'
import classNames from 'classnames'
import Grid from '../../../../components/main_layout/public/icons/grid.svg'
import List from '../../../../components/main_layout/public/icons/list.svg'
import FilterSort from '../filter_sort'
import React from 'react'
import { connect } from 'react-redux'

function displayButtonClass(buttonType, displayType) {
  return classNames(
    `auction-artworks-header__${buttonType}`,
    { active: displayType === buttonType }
  )
}

function Header(props) {
  const {
    isListView,
    toggleListViewAction,
    total
  } = props
  const displayType = isListView ? 'list' : 'grid'
  const totalLabel = (total && total > 0)
    ? `${total} Artworks`
    : 'Loading results.'

  return (
    <div className='auction-artworks-header'>
      <div className='auction-artworks-header__left'>
        <div className='auction-artworks-header__total'>
          { totalLabel }
        </div>
      </div>
      <div className='auction-artworks-header__right'>
        <div className='auction-artworks-header__sort'>
          <FilterSort />
        </div>
        <div className='auction-artworks-header__switch'>
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

const mapStateToProps = (state) => {
  return {
    isListView: state.auctionArtworks.isListView,
    total: state.auctionArtworks.total,
  }
}

const mapDispatchToProps = {
  toggleListViewAction: toggleListView
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
