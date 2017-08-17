import React from 'react'

const GeneFamilyNav = ({ geneFamilies }) => {
  return (
    <ul>
      {geneFamilies.map(geneFamily => <li key={geneFamily.id}>TK</li>)}
    </ul>
  )
}

export default GeneFamilyNav
