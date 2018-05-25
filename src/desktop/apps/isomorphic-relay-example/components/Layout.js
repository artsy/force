import Nav from './Nav'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { ContextProvider } from '@artsy/reaction/dist/Components/Artsy'
import { data as sd } from 'sharify'

export function Layout(props) {
  return (
    <ContextProvider currentUser={sd.CURRENT_USER}>
      <Container>
        <Nav />
        <div>
          <br />
          <hr />
          <h3>Experimental SSR Relay Architecture</h3>
          <hr />

          <div>{props.children}</div>
        </div>
      </Container>
    </ContextProvider>
  )
}

const Container = styled.div`
  padding: 20px;
  line-height: 1.5;

  h3 {
    padding: 20;
  }
`

Layout.propTypes = {
  children: PropTypes.node,
}
