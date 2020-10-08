import React from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Box, Column, GridColumns, Separator } from "@artsy/palette"
import { ShowMetaFragmentContainer as ShowMeta } from "v2/Apps/Show/components/ShowMeta"
import { ShowHeaderFragmentContainer as ShowHeader } from "./components/ShowHeader"
import { ShowAboutFragmentContainer as ShowAbout } from "./components/ShowAbout"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./components/ShowInstallShots"
import { ShowContextualLinkFragmentContainer as ShowContextualLink } from "./components/ShowContextualLink"
import { ShowViewingRoom } from "./components/ShowViewingRoom"
import { ShowApp_show } from "v2/__generated__/ShowApp_show.graphql"
import { ShowArtworksRefetchContainer as ShowArtworks } from "./components/ShowArtworks"

interface ShowAppProps {
  show: ShowApp_show
}

const FullScreenSeparator = styled(Separator)`
  left: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  position: relative;
  right: 50%;
  width: 100vw;
`

export const ShowApp: React.FC<ShowAppProps> = ({ show }) => {
  if (!show) return <ErrorPage code={404} />

  const hasViewingRoom = false // TODO
  const hasAbout = !!show.about || !!show.pressRelease
  const hasWideHeader =
    (hasAbout && hasViewingRoom) || (!hasAbout && !hasViewingRoom)

  return (
    <>
      <ShowMeta show={show} />

      <AppContainer>
        <HorizontalPadding>
          <Box my={2}>
            <ShowContextualLink show={show} />
            <FullScreenSeparator as="hr" my={2} />
          </Box>

          <ShowInstallShots show={show} my={2} />

          <GridColumns>
            <Column span={hasWideHeader ? [12, 8, 6] : 6} wrap={hasWideHeader}>
              <ShowHeader show={show} />
            </Column>

            {hasAbout && (
              <Column span={6}>
                <ShowAbout show={show} />
              </Column>
            )}

            {hasViewingRoom && (
              <Column span={5} start={8}>
                <ShowViewingRoom />
              </Column>
            )}
          </GridColumns>

          <Separator as="hr" my={3} />

          <ShowArtworks show={show} />

          <Separator as="hr" my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(ShowApp, {
  show: graphql`
    fragment ShowApp_show on Show
      @argumentDefinitions(
        acquireable: { type: "Boolean" }
        aggregations: { type: "[ArtworkAggregation]" }
        atAuction: { type: "Boolean" }
        color: { type: "String" }
        forSale: { type: "Boolean" }
        inquireableOnly: { type: "Boolean" }
        majorPeriods: { type: "[String]" }
        medium: { type: "String", defaultValue: "*" }
        offerable: { type: "Boolean" }
        page: { type: "Int" }
        partnerID: { type: "ID" }
        priceRange: { type: "String" }
        sizes: { type: "[ArtworkSizes]" }
        sort: { type: "String", defaultValue: "-decayed_merch" }
      ) {
      name
      about: description
      pressRelease
      ...ShowContextualLink_show
      ...ShowHeader_show
      ...ShowAbout_show
      ...ShowMeta_show
      ...ShowInstallShots_show
      ...ShowArtworks_show
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          atAuction: $atAuction
          color: $color
          forSale: $forSale
          inquireableOnly: $inquireableOnly
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          partnerID: $partnerID
          priceRange: $priceRange
          sizes: $sizes
          sort: $sort
        )
    }
  `,
})
