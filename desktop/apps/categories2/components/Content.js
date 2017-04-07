import React from 'react'
import styled from 'styled-components'

const Column = styled.div`
  flex: 4
`

function Content(props){
  return (
    <Column>
      {props.children}
    </Column>
  )
}

export default Content
