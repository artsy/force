import React from 'react'
import Gene from './Gene'

const GeneFamily = ({ id, name, genes }) => {
  return (
    <div>
      <h2>
        {name}
      </h2>
      <ul>
        {genes.map(gene => <Gene key={gene.id} {...gene} />)}
      </ul>
    </div>
  )
}

export default GeneFamily
