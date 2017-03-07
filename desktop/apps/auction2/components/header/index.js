import classNames from 'classnames'
import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import Grid from '../../../../components/main_layout/public/icons/grid.svg'
import List from '../../../../components/main_layout/public/icons/list.svg'
import FilterSortContainer from '../filter_sort/index'
import { toggleListView, updateSort } from '../../actions'

function displayButtonClass(buttonType, displayType) {
  return classNames(
    `auction2-artworks-header__${buttonType}`,
    { active: displayType === buttonType }
  )
}

function Header({ isListView, total, toggleListViewAction }) {
  const displayType = isListView ? 'list' : 'grid'
  const totalLabel = (total && total > 0)
    ? `${total} Artworks for sale`
    : 'Your search returned 0 results. Try removing some filters.'

  return (
    <div className='auction2-artworks-header'>
      <div className='auction2-artworks-header__total'>
        { totalLabel }
      </div>
      <div className='auction2-artworks-header__sort'>
        <FilterSortContainer />
      </div>
      <div className='auction2-artworks-header__switch'>
        <div className={displayButtonClass('grid', displayType)} onClick={() => toggleListViewAction(false)}>
          <Grid />
        </div>
        <div className={displayButtonClass('list', displayType)} onClick={() => toggleListViewAction(true)}>
          <List />
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleListViewAction: (isListView) => dispatch(toggleListView(isListView))
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
