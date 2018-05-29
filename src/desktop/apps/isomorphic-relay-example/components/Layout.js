import Nav from './Nav'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export function Layout(props) {
  return (
    <div>
      <Container>
        <Nav />
        <br />
        <hr />
        <h3>Experimental SSR Relay Architecture</h3>
        <hr />

        <div>{props.children}</div>
      </Container>
    </div>
  )
}

const Container = styled.div`
  padding: 20px;
  line-height: 1.5;
`

Layout.propTypes = {
  children: PropTypes.node,
}
