import React from 'react'
import PropTypes from 'prop-types'
import Gene from './Gene'

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  genes: PropTypes.array.isRequired
}

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

GeneFamily.propTypes = propTypes

export default GeneFamily
