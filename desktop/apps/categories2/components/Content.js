import React from 'react'
import styled from 'styled-components'

const StyledContent = styled.div`
  flex: 4
`

function Content(props){
  return (
    <StyledContent className="categories2-content">
      {props.children}
    </StyledContent>
  )
}

export default Content
