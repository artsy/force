import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Header } from '../nav/header.jsx'
import { SectionsNav } from '../nav/sections_nav.jsx'

export const SeriesHeader = (props) => {
  const {
    curation,
    inBody,
    isMobile,
    onChangeSection
  } = props

  const {
    name,
    partner_logo_primary,
    partner_link_url
  } = curation

  return (
    <SeriesHeaderContainer className='SeriesHeader'>
      <Header
        title={name}
        isMobile={isMobile}
        partner_logo={partner_logo_primary}
        partner_url={partner_link_url}
      />
      <Title>
        {curation.name}
      </Title>
      <Waypoint
        onEnter={() => inBody(false)}
        onLeave={() => inBody(true)}
      />
      <SectionsNav
        activeSection={null}
        sections={curation.sections}
        onClick={onChangeSection}
      />
    </SeriesHeaderContainer>
  )
}

SeriesHeader.propTypes = {
  curation: PropTypes.object,
  inBody: PropTypes.func,
  isMobile: PropTypes.bool,
  onChangeSection: PropTypes.func
}

const SeriesHeaderContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  .Header {
    .title {
      display: none;
    }
  }
  .SectionsNav__item {
    color: black;
  }
  ${pMedia.sm`
    .SectionsNav {
      margin-top: 40px;
    }
  `}
`
const Title = styled.div`
  font-size: 120px;
  line-height: 111px;
  letter-spacing: -3.5px;
  text-transform: uppercase;
  margin: 80px auto 40px auto;
  text-align: center;
  max-width: 1060px;
  ${pMedia.lg`
    font-size: 50px;
    line-height: 0.9em;
    letter-spacing: -1.5px;
  `}
`
