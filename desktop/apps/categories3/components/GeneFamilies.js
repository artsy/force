import React from 'react'
import GeneFamily from './GeneFamily'

const GeneFamilies = ({ geneFamilies }) => {
  return (
    <div>
      {geneFamilies.map(geneFamily =>
        <GeneFamily key={geneFamily.id} {...geneFamily} />
      )}
    </div>
  )
}

export default GeneFamilies
