import React from 'react'
import TAGPIntro from './TAGPIntro'
import GeneFamilies from './GeneFamilies'

const TAGPContent = ({ geneFamilies }) => {
  return (
    <div>
      <TAGPIntro />
      <GeneFamilies geneFamilies={geneFamilies} />
    </div>
  )
}

export default TAGPContent
