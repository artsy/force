import ArtworkDisplay from './display/ArtworkDisplay'
import Header from './header/Header'
import PropTypes from 'prop-types'
import React from 'react'
import Sidebar from './sidebar/Sidebar'
import block from 'bem-cn'
import { connect } from 'react-redux'

function ArtworkBrowser ({ isMobile }) {
  const b = block('auction2-commercial-filter')

  return (
    <div className={b()}>
      { isMobile
        ? <div>
            <Header />
            <ArtworkDisplay />
          </div>
        : <div className={b('container')}>
            <div className={b('left').mix('cf-sidebar')}>
              <Sidebar />
            </div>
            <div className={b('right').mix('cf-right')}>
              <Header />
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
