import { makeLayout } from 'desktop/components/react/main_layout/layout.jsx'
import PropTypes from 'prop-types'
import React from 'react'

export default function IndexRoute (props) {
  const { Header, Meta, Body, Footer } = makeLayout(props)

  return (
    <div>
      <Header>
        <Meta />
      </Header>
      <Body>
        foo
      </Body>
      <Footer />
    </div>
  )
}

IndexRoute.propTypes = {
  templates: PropTypes.shape({
    meta: PropTypes.string.isRequired
  })
}
