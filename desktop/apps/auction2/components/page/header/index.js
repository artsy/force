import PropTypes from 'prop-types'
import React from 'react'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'
import { connect } from 'react-redux'

function HeaderContainer ({ isMobile }) {
  return isMobile
    ? <HeaderMobile />
    : <HeaderDesktop />
}

HeaderContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile
})

export default connect(
  mapStateToProps
)(HeaderContainer)
