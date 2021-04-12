import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Separator, Spacer } from "@artsy/palette"

import { Footer } from "v2/Components/Footer"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesApp_artistSeries } from "v2/__generated__/ArtistSeriesApp_artistSeries.graphql"
import { ArtistSeriesHeaderFragmentContainer as ArtistSeriesHeader } from "./Components/ArtistSeriesHeader"
import { ArtistSeriesArtworksFilterRefetchContainer as ArtistSeriesArtworksFilter } from "./Components/ArtistSeriesArtworksFilter"
import { ErrorPage } from "v2/Components/ErrorPage"
import { ArtistSeriesRailFragmentContainer as OtherArtistSeriesRail } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ArtistSeriesMetaFragmentContainer as ArtistSeriesMeta } from "./Components/ArtistSeriesMeta"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { ContextModule } from "@artsy/cohesion"
import { Media } from "v2/Utils/Responsive"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"
import { SharedArtworkFilterContextProps } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"

interface ArtistSeriesAppProps {
  artistSeries: ArtistSeriesApp_artistSeries
}

const ArtistSeriesApp: React.FC<ArtistSeriesAppProps> = ({ artistSeries }) => {
  const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

  if (artistSeries) {
    const { railArtist, internalID, sidebarAggregations } = artistSeries

    return (
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: internalID,
          contextPageOwnerSlug,
          contextPageOwnerType,
        }}
      >
        <AppContainer maxWidth="100%">
          {/* NOTE: react-head automatically moves these tags to the <head> element */}
          <ArtistSeriesMeta artistSeries={artistSeries} />
          <ArtistSeriesHeader artistSeries={artistSeries} />
          <Box mx={3}>
            <Media greaterThan="xs">
              <Spacer my={3} />
            </Media>
            <Media at="xs">
              <Separator my={2} />
            </Media>
            <AppContainer>
              <ArtistSeriesArtworksFilter
                aggregations={
                  sidebarAggregations.aggregations as SharedArtworkFilterContextProps["aggregations"]
                }
                artistSeries={artistSeries}
              />
              <Separator mt={6} mb={3} />

              {/* HOTFIX FIXME: This rail was causing an error if included in SSR render
              pass and so it was deferred to the client.

              See: https://github.com/artsy/force/pull/6137
           */}
              {railArtist.length && typeof window !== "undefined" && (
                <LazyLoadComponent threshold={1000}>
                  <OtherArtistSeriesRail
                    artist={railArtist[0]}
                    title="Series by this artist"
                    contextModule={ContextModule.moreSeriesByThisArtist}
                  />
                </LazyLoadComponent>
              )}
              <Footer />
            </AppContainer>
          </Box>
        </AppContainer>
      </AnalyticsContext.Provider>
    )
  } else {
    return <ErrorPage code={404} />
  }
}

export const ArtistSeriesAppFragmentContainer = createFragmentContainer(
  ArtistSeriesApp,
  {
    artistSeries: graphql`
      fragment ArtistSeriesApp_artistSeries on ArtistSeries
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
        ) {
        ...ArtistSeriesMeta_artistSeries
        ...ArtistSeriesHeader_artistSeries
        railArtist: artists(size: 1) {
          ...ArtistSeriesRail_artist
        }
        internalID
        slug
        ...ArtistSeriesArtworksFilter_artistSeries @arguments(input: $input)
        sidebarAggregations: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
      }
    `,
  }
)
