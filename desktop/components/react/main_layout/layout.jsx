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

export function makeLayout (props) {
  return getLayout().render(props)
}

export function makePartial (html) {
  const PartialComponent = ({ children }) => {
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {children}
      </div>
    )
  }

  PartialComponent.propTypes = {
    children: PropTypes.node
  }

  return PartialComponent
}
