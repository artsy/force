import Nav from './Nav'
import PropTypes from 'prop-types'
import React from 'react'
import { ContextProvider } from '@artsy/reaction/dist/Components/Artsy'

export function Layout(props) {
  return (
    <ContextProvider>
      <div>
        <Nav />
        <div>
          <h3>Isomorphic Relay app using Found</h3>
          <div>{props.children}</div>
        </div>
      </div>
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
