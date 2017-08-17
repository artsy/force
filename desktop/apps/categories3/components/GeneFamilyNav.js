import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}

const ResponsiveSidebar = styled.aside`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 24%;
    overflow: hidden;
    padding-top: 0.5em;
  }
`

const GeneFamilyList = styled.ul`
  position: fixed;
  width: inherit;
  padding-right: 2em;

  font-family: 'ITC Avant Garde Gothic W04', 'AvantGardeGothicITCW01D 731075',
    'AvantGardeGothicITCW01Dm', 'Helvetica', 'sans-serif';
  font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;

  font-size: 13px;
  line-height: 1.33em;
`

const GeneFamilyItem = styled.li`margin-bottom: 1em;`

const GeneFamilyLink = styled.a`
  transition: color 0.125s;

  &:hover {
    color: #6e1fff;
  }
`

const GeneFamilyNav = ({ geneFamilies }) => {
  return (
    <ResponsiveSidebar>
      <GeneFamilyList>
        {geneFamilies.map(geneFamily =>
          <GeneFamilyItem key={geneFamily.id}>
            <GeneFamilyLink>
              {geneFamily.name}
            </GeneFamilyLink>
          </GeneFamilyItem>
        )}
      </GeneFamilyList>
    </ResponsiveSidebar>
  )
}

GeneFamilyNav.propTypes = propTypes

export default GeneFamilyNav
