import { media, Box } from "@artsy/palette"
import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import Waypoint from "react-waypoint"
import { Header } from "../nav/header"
import { SectionsNav } from "../nav/sections_nav"

export const SeriesHeader = props => {
  const { curation, inBody, isMobile, onChangeSection } = props

  const { name, partner_logo_primary, partner_link_url } = curation

  return (
    <SeriesHeaderContainer className="SeriesHeader">
      <Header
        title={name}
        isMobile={isMobile}
        partner_logo={partner_logo_primary}
        partner_url={partner_link_url}
      />
      <Box mt={80} mb={40} mx="auto" maxWidth="1060px" textAlign="center">
        <Title>{curation.name}</Title>
      </Box>
      <Waypoint onEnter={() => inBody(false)} onLeave={() => inBody(true)} />
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
  onChangeSection: PropTypes.func,
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
  ${media.sm`
    .SectionsNav {
      margin-top: 50px;
      margin-bottom: 0;
    }
  `};
`
const Title = styled.div`
  font-size: 120px;
  line-height: 111px;
  letter-spacing: -3.5px;
  text-transform: uppercase;

  ${media.lg`
    font-size: 50px;
    line-height: 0.9em;
    letter-spacing: -1.5px;
  `};
`
