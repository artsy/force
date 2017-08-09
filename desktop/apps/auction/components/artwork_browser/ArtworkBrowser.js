import ArtworkDisplay from './main/ArtworkDisplay'
import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'
import PropTypes from 'prop-types'
import React from 'react'
import Sidebar from './sidebar/Sidebar'
import block from 'bem-cn'
import { connect } from 'react-redux'

function ArtworkBrowser ({ isMobile }) {
  const b = block('auction-ArtworkBrowser')

  return (
    <div className={b()}>
      { isMobile
        ? <div className={b('container')}>
            <HeaderMobile />
            <ArtworkDisplay />
          </div>

          // Desktop
        : <div className={b('container')}>
            <div className={b('left').mix('cf-sidebar')}>
              <Sidebar />
            </div>
            <div className={b('right').mix('cf-right')}>
              <HeaderDesktop />
              <ArtworkDisplay />
            </div>
          </div> }
    </div>
  )
}

ArtworkBrowser.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile
})

export default connect(
  mapStateToProps
)(ArtworkBrowser)
