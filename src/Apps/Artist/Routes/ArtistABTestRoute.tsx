import { BaseTab, Clickable, Skeleton, Spacer, Text } from "@artsy/palette"
import { useVariant } from "@unleash/proxy-client-react"
import { ArtistTabs } from "Apps/Artist/Components/ArtistTabs"
import { ArtistAuctionResultsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResults"
import { MarketStatsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { ArtistCombinedRouteFragmentContainer } from "Apps/Artist/Routes/Combined/ArtistCombinedRoute"
import { ArtistOverviewQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { RouteTabs } from "Components/RouteTabs"
import { useRouter } from "System/Hooks/useRouter"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import type { ArtistABTestRoute_artist$data } from "__generated__/ArtistABTestRoute_artist.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

const ARTIST_COMBINED_LAYOUT_FLAG = "diamond_artist-combined-layout"

interface ArtistABTestRouteProps {
  artist: ArtistABTestRoute_artist$data
}

export const ArtistABTestRoute: FC<
  React.PropsWithChildren<ArtistABTestRouteProps>
> = ({ artist }) => {
  const {
    match: { location },
  } = useRouter()

  const page = location.pathname.split("/").pop()
  const variant = useVariant(ARTIST_COMBINED_LAYOUT_FLAG)

  useTrackFeatureVariantOnMount({
    experimentName: ARTIST_COMBINED_LAYOUT_FLAG,
    variantName: variant.name,
  })

  switch (variant.name) {
    case "experiment": {
      return <ArtistCombinedRouteFragmentContainer artist={artist} />
    }

    case "control": {
      return (
        <>
          <Spacer y={[2, 4]} />

          <ArtistTabs slug={artist.slug} />

          <Spacer y={[2, 4]} />

          {page === "" && (
            <>
              <Text variant="lg-display" as="h2">
                Artworks
              </Text>

              <Spacer y={2} />

              <ArtistArtworkFilterQueryRenderer id={artist.internalID} />
            </>
          )}

          {page === "auction-results" && (
            <>
              <MarketStatsQueryRenderer id={artist.internalID} />

              <Spacer y={6} />

              <Text variant="lg-display" as="h2">
                Auction Results
              </Text>

              <Spacer y={2} />

              <ArtistAuctionResultsQueryRenderer id={artist.internalID} />
            </>
          )}

          {page === "about" && (
            <ArtistOverviewQueryRenderer id={artist.internalID} />
          )}
        </>
      )
    }

    default: {
      // Loading state while we wait for the variant to be determined
      return (
        <Skeleton>
          <Spacer y={[2, 4]} />

          <RouteTabs>
            <BaseTab as={Clickable} disabled>
              Artworks
            </BaseTab>

            <BaseTab as={Clickable} disabled>
              Auction Results
            </BaseTab>

            <BaseTab as={Clickable} disabled>
              About
            </BaseTab>
          </RouteTabs>
        </Skeleton>
      )
    }
  }
}

export const ArtistABTestRouteFragmentContainer = createFragmentContainer(
  ArtistABTestRoute,
  {
    artist: graphql`
      fragment ArtistABTestRoute_artist on Artist {
        ...ArtistCombinedRoute_artist
        internalID
        slug
      }
    `,
  },
)
