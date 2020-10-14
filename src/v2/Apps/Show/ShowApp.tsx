import React from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Box, Column, GridColumns, Separator } from "@artsy/palette"
import { ShowMetaFragmentContainer as ShowMeta } from "v2/Apps/Show/Components/ShowMeta"
import { ShowHeaderFragmentContainer as ShowHeader } from "./Components/ShowHeader"
import { ShowAboutFragmentContainer as ShowAbout } from "./Components/ShowAbout"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./Components/ShowInstallShots"
import { ShowContextualLinkFragmentContainer as ShowContextualLink } from "./Components/ShowContextualLink"
import { ShowViewingRoom } from "./Components/ShowViewingRoom"
import { ShowApp_show } from "v2/__generated__/ShowApp_show.graphql"
import { ShowArtworksRefetchContainer as ShowArtworks } from "./Components/ShowArtworks"
import { ForwardLink } from "v2/Components/Links/ForwardLink"
import { ShowContextCardFragmentContainer as ShowContextCard } from "./Components/ShowContextCard"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"

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
  const hasAbout = !!show.about
  const hasWideHeader =
    (hasAbout && hasViewingRoom) || (!hasAbout && !hasViewingRoom)

  return (
    <>
      <ShowMeta show={show} />

      <AppContainer>
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: show.internalID,
            contextPageOwnerSlug: show.slug,
            contextPageOwnerType: OwnerType.show,
          }}
        >
          <HorizontalPadding>
            <Box my={2}>
              <ShowContextualLink show={show} />
              <FullScreenSeparator as="hr" my={2} />
            </Box>

            <ShowInstallShots show={show} my={2} />

            <GridColumns>
              <Column
                span={hasWideHeader ? [12, 8, 6] : 6}
                wrap={hasWideHeader}
              >
                <ShowHeader show={show} />

                {!hasAbout && (
                  <ForwardLink
                    to={`${show.href.replace("/show", "/show2")}/info`}
                    mt={1}
                  >
                    More info
                  </ForwardLink>
                )}
              </Column>

              {hasAbout && (
                <Column span={6}>
                  <ShowAbout show={show} />

                  <ForwardLink
                    to={`${show.href.replace("/show", "/show2")}/info`}
                    mt={2}
                  >
                    More info
                  </ForwardLink>
                </Column>
              )}

              {hasViewingRoom && (
                <Column span={5} start={8}>
                  <ShowViewingRoom />
                </Column>
              )}
            </GridColumns>

            <ShowArtworks show={show} my={3} />

            <Separator as="hr" my={3} />

            <ShowContextCard show={show} />

            <Separator as="hr" my={3} />

            <Footer />
          </HorizontalPadding>
        </AnalyticsContext.Provider>
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
      href
      internalID
      slug
      about: description
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

      ...ShowContextCard_show
    }
  `,
})
