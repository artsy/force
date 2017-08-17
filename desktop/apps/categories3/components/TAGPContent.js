import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TAGPIntro from './TAGPIntro'
import GeneFamilies from './GeneFamilies'

const Main = styled.main`
  background: orange;
  width: 74%;
`
const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}
const TAGPContent = ({ geneFamilies }) => {
  return (
    <Main>
      <TAGPIntro />
      <GeneFamilies geneFamilies={geneFamilies} />
    </Main>
  )
}

TAGPContent.propTypes = propTypes

export default TAGPContent
