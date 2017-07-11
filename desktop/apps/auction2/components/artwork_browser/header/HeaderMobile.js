import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { toggleListView } from 'desktop/apps/auction2/actions/filter'

function HeaderMobile (props) {
  const { total, isListView, toggleListViewAction } = props

  const b = block('auction2-artworks-header-mobile')

  return (
    <header className={b()}>
      <div className={b('total')}>
        <em>
          {total}
        </em>
      </div>

      {/*  FIXME: Remove */}
      <div onClick={() => toggleListViewAction(!isListView)}>
        Toggle {isListView}
      </div>

      <div>
        <div>
          Sort by:
          <select dir='rtl' className={b('sort')}>
            <option value='default'>Default</option>
            <option value='name_asc'>Artists A–Z</option>
            <option value='bids_desc'>Most Bids</option>
            <option value='bids_asc'>Least Bids</option>
            <option value='amount_desc'>Highest Bid</option>
            <option value='amount_asc'>Lowest Bid</option>
          </select>
        </div>
      </div>
    </header>
  )
}

HeaderMobile.propTypes = {
  total: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const { isListView, total } = state.auctionArtworks

  return {
    isListView,
    total: `${total} Lots`
  }
}

const mapDispatchToProps = {
  toggleListViewAction: toggleListView
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderMobile)
