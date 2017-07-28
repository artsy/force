import * as React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
`

Sidebar.propTypes = {
  article: PropTypes.object
}

export default function Sidebar (props) {
  const { article } = props
  return (
    <SidebarContainer>
      <a href={article.title}>This is a social Link!</a>
    </SidebarContainer>
  )
}
