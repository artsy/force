import classNames from 'classnames'
import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import Grid from '../../../../components/main_layout/public/icons/grid.svg'
import List from '../../../../components/main_layout/public/icons/list.svg'
import { toggleListView } from '../../actions'

function displayButtonClass(buttonType, displayType) {
  return classNames(
    `auction2-artworks-header__${buttonType}`,
    { active: displayType === buttonType }
  )
}

function Header({ isListView, dispatch }) {
  const displayType = isListView ? 'list' : 'grid'

  return (
    <div className={'auction2-artworks-header'}>
      <div className={displayButtonClass('grid', displayType)} onClick={() => dispatch(toggleListView(false))}>
        <Grid />
      </div>
      <div className={displayButtonClass('list', displayType)} onClick={() => dispatch(toggleListView(true))}>
        <List />
      </div>
    </div>
  )
}

Header.propTypes = {
  isListView: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return { isListView: state.auctionArtworks.isListView }
}

const HeaderContainer = connect(
  mapStateToProps
)(Header)

export default HeaderContainer
