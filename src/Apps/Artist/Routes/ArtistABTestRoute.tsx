import { ArtistTabs } from "Apps/Artist/Components/ArtistTabs"
import { ArtistAuctionResultsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResults"
import { MarketStatsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { ArtistCombinedRouteFragmentContainer } from "Apps/Artist/Routes/Combined/ArtistCombinedRoute"
import { ArtistOverviewQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { RouteTabs } from "Components/RouteTabs"
import { useVariant } from "System/FeatureFlags/useVariant"
import { useRouter } from "System/Hooks/useRouter"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import { BaseTab, Clickable, Skeleton, Spacer, Text } from "@artsy/palette"
import { useFlagsStatus } from "@unleash/proxy-client-react"
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
  const variant = useVariant(ARTIST_COMBINED_LAYOUT_FLAG)
  const { flagsReady } = useFlagsStatus()

  useTrackFeatureVariantOnMount({
    experimentName: ARTIST_COMBINED_LAYOUT_FLAG,
    variantName: variant.name,
  })

  if (!flagsReady) {
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

  if (variant.name === "experiment") {
    return <ArtistCombinedRouteFragmentContainer artist={artist} />
  }

  // "control" or "disabled"
  return (
    <>
      <Spacer y={[2, 4]} />

      <ArtistTabs slug={artist.slug} />

      <Spacer y={[2, 4]} />

      <ArtistABTestRouteControl artist={artist} />
    </>
  )
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
  }
)

const ArtistABTestRouteControl: FC<
  React.PropsWithChildren<ArtistABTestRouteProps>
> = ({ artist }) => {
  const {
    match: { location },
  } = useRouter()

  const page = location.pathname.split("/").pop()

  switch (page) {
    case "auction-results": {
      return (
        <>
          <MarketStatsQueryRenderer id={artist.internalID} />

          <Spacer y={6} />

          <Text variant="lg-display" as="h2">
            Auction Results
          </Text>

          <Spacer y={2} />

          <ArtistAuctionResultsQueryRenderer id={artist.internalID} />
        </>
      )
    }

    case "about": {
      return <ArtistOverviewQueryRenderer id={artist.internalID} />
    }

    default: {
      return (
        <>
          <Text variant="lg-display" as="h2">
            Artworks
          </Text>

          <Spacer y={2} />

          <ArtistArtworkFilterQueryRenderer id={artist.internalID} />
        </>
      )
    }
  }
}
