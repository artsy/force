import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const GeneLI = styled.li`
  line-height: 2em;
`
const GeneA = styled.a`
  text-decoration: none;

  &:hover {
    color: purple;
  }
`
const Gene = ({ id, name }) => {
  return (
    <GeneLI>
      <GeneA href='#'>
        {name}
      </GeneA>
    </GeneLI>
  )
}

Gene.propTypes = propTypes

export default Gene
