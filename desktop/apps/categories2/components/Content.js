import React from 'react'
import styled from 'styled-components'

const StyledContent = styled.div`
  flex: 4
`

const Content = (props) => {
  return (
    <StyledContent className="categories2-content">
      {props.children}
    </StyledContent>
  )
}

export default Content
