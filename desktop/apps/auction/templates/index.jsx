import { makeLayout, makePartial } from 'desktop/components/react/main_layout/layout.jsx'
import PropTypes from 'prop-types'
import React from 'react'

export default function IndexRoute (props) {
  const { Header, Body, Footer } = makeLayout(props)
  const Content = makePartial(props.html)

  return (
    <div>
      <Header />
      <Body>
        <Content />
      </Body>
      <Footer />
    </div>
  )
}

IndexRoute.propTypes = {
  html: PropTypes.string.isRequired
}
