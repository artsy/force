import { BaseTab, Clickable, Skeleton, Spacer } from "@artsy/palette"
import { useVariant } from "@unleash/proxy-client-react"
import { useFlagsStatus } from "@unleash/proxy-client-react"
import { ArtistCombinedRouteFragmentContainer } from "Apps/Artist/Routes/Combined/ArtistCombinedRoute"
import { RouteTabs } from "Components/RouteTabs"
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

  return <ArtistCombinedRouteFragmentContainer artist={artist} />
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
