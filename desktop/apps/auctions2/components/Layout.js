import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function Layout ({ isMobile }) {
  return (
    <div>
      {isMobile
        ? <div>
            Hello Mobile!
          </div>
        : <div>
            Hello Desktop!
          </div> }
    </div>
  )
}

Layout.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile
})

export default connect(
  mapStateToProps
)(Layout)
