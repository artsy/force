import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}

const ResponsiveSidebar = styled.aside`
  background: pink;
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 24%;
    overflow: hidden;
  }
`

const GeneFamilyList = styled.ul`
  position: fixed;
  width: inherit;
  padding-right: 2em;
`
const GeneFamilyNav = ({ geneFamilies }) => {
  return (
    <ResponsiveSidebar>
      <GeneFamilyList>
        {geneFamilies.map(geneFamily =>
          <li key={geneFamily.id}>
            {geneFamily.name}
          </li>
        )}
      </GeneFamilyList>
    </ResponsiveSidebar>
  )
}

GeneFamilyNav.propTypes = propTypes

export default GeneFamilyNav
