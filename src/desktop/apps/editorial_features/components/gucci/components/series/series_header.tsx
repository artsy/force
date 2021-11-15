import { Box, media } from "@artsy/palette"
import styled from "styled-components"
import * as React from "react"
import Waypoint from "react-waypoint"
import { Header } from "../nav/header"
import { SectionsNav } from "../nav/sections_nav"

interface SeriesHeaderProps {
  activeSection?: number
  curation: any
  inBody: (inBody: boolean) => void
  onChangeSection: (index: number) => void
}

export const SeriesHeader: React.SFC<SeriesHeaderProps> = props => {
  const { curation, inBody, onChangeSection } = props
  const { name, partner_logo_primary, partner_link_url } = curation

  return (
    <SeriesHeaderContainer className="SeriesHeader">
      <Header
        title={name}
        partner_logo={partner_logo_primary}
        partner_url={partner_link_url}
      />
      <Box mt={80} mb={4} mx="auto" maxWidth="1060px" textAlign="center">
        <Title>{curation.name}</Title>
      </Box>
      <Waypoint onEnter={() => inBody(false)} onLeave={() => inBody(true)} />
      <SectionsNav
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        activeSection={null}
        sections={curation.sections}
        onClick={onChangeSection}
      />
    </SeriesHeaderContainer>
  )
}

const SeriesHeaderContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
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
