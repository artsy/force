import React from 'react'
import styled from 'styled-components'

const Ul = styled.ul`
  padding-top: 2em
`

const StyledSidebar = styled.div`
  flex: 1
  font-size: 14px
  color: #333
  padding: 2em 1em
  text-transform: uppercase
`

const Sidebar = (props) => {
  return (
    <StyledSidebar>
      <Ul>
        {
          props.data.map((value) => {
            return (
              <li key={`gene-${value.id}`}>
                <a href={`#${value.id}`}>{value.name}</a>
              </li>
            )
          })
        }
      </Ul>
    </StyledSidebar>
  )
}

Sidebar.propTypes = {
  data: React.PropTypes.array
}

export default Sidebar
