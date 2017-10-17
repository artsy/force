import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '@artsy/reaction-force/dist/Assets/Colors'

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  display_name: PropTypes.string
}

const GeneItem = styled.li`
  font-size: 20px;
  line-height: 1.33em;
  margin-bottom: 0.66em;
`
const GeneLink = styled.a`
  text-decoration: none;

  &:hover {
    color: ${colors.purpleRegular};
  }
`
const Gene = ({ id, name, display_name }) => {
  return (
    <GeneItem>
      <GeneLink href={`/gene/${id}`}>
        {display_name || name}
      </GeneLink>
    </GeneItem>
  )
}

Gene.propTypes = propTypes

export default Gene
