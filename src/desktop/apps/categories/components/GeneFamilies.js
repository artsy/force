import React from "react"
import PropTypes from "prop-types"

import GeneFamily from "./GeneFamily"
import { featuredGenesForFamily } from "../utils.js"

const propTypes = {
  geneFamilies: PropTypes.array.isRequired,
}

const GeneFamilies = ({ geneFamilies }) => {
  return (
    <div>
      {geneFamilies.map(geneFamily => {
        return <GeneFamily key={geneFamily.id} {...geneFamily} />
      })}
    </div>
  )
}

GeneFamilies.propTypes = propTypes

export default GeneFamilies
