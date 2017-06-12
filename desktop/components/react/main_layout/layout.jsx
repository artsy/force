import PropTypes from 'prop-types'
import React from 'react'
import getLayout from './utils/get_layout'

export default function Layout ({ children, ...props }) {
  const { Header, Body, Footer } = getLayout().render(props)

  return (
    <div>
      <Header />
      <Body>
        {children}
      </Body>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
