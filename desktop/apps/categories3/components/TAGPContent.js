import React from 'react'
import TAGPIntro from './TAGPIntro'
import GeneFamilies from './GeneFamilies'

import PropTypes from 'prop-types'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}
const TAGPContent = ({ geneFamilies }) => {
  return (
    <div>
      <TAGPIntro />
      <GeneFamilies geneFamilies={geneFamilies} />
    </div>
  )
}

TAGPContent.propTypes = propTypes

export default TAGPContent
