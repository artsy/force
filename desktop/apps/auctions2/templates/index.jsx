import PropTypes from 'prop-types'
import React from 'react'
import { withLayout } from 'desktop/components/react/main_layout'

function Index (props) {
  const {
    Layout: { Header, Body, Footer },
    Templates: { Meta }
  } = props

  return (
    <div>
      <Header>
        <Meta />
      </Header>
      <Body>
        hello!
      </Body>
      <Footer />
    </div>
  )
}

Index.propTypes = {
  Layout: PropTypes.shape({
    Header: PropTypes.element.isRequired,
    Body: PropTypes.element.isRequired,
    Footer: PropTypes.element.isRequired
  }),
  Templates: PropTypes.shape({
    Meta: PropTypes.element.isRequired
  })
}

export default withLayout(Index)
