import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SeriesNav } from '../series/series_nav.jsx'
import { Header } from './header.jsx'

export const FixedHeader = (props) => {
  const { activeSection, curation, isVisible, onChangeSection } = props
  const { name, partner_logo_primary, partner_link_url } = curation

  return (
    <FixedHeaderContainer className='FixedHeader' isVisible={isVisible}>
      <Header
        title={name}
        partner_logo={partner_logo_primary}
        partner_url={partner_link_url}
      />
      <SeriesNav
        activeSection={activeSection}
        curation={curation}
        onClick={onChangeSection}
      />
    </FixedHeaderContainer>
  )
}

FixedHeader.propTypes = {
  activeSection: PropTypes.number,
  curation: PropTypes.object,
  isVisible: PropTypes.bool,
  onChangeSection: PropTypes.func
}

const FixedHeaderContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: white;
  position: fixed;
  z-index: 100;
  opacity: ${props => props.isVisible ? '1' : '0'};
  ${pMedia.sm`
    .SeriesNav {
      margin-top: 40px;
    }
  `}
`
