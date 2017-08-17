import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}

const Sidebar = styled.aside`
  width: 24%;
  background: pink'
`

const GeneFamilyList = styled.ul`
  position: fixed;
  width: inherit;
  padding-right: 2em;
  `
const GeneFamilyNav = ({ geneFamilies }) => {
  return (
    <Sidebar>
      <GeneFamilyList>
        {geneFamilies.map(geneFamily =>
          <li key={geneFamily.id}>
            {geneFamily.name}
          </li>
        )}
      </GeneFamilyList>
    </Sidebar>
  )
}

GeneFamilyNav.propTypes = propTypes

export default GeneFamilyNav
