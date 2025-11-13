import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
} from "Components/Cells/CellArtist"
import { Rail } from "Components/Rail/Rail"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import {
  ActionType,
  type ClickedArtistGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import type { HomeRecommendedArtistsRail_me$key } from "__generated__/HomeRecommendedArtistsRail_me.graphql"
import type { HomeRecommendedArtistsRailQuery } from "__generated__/HomeRecommendedArtistsRailQuery.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface HomeRecommendedArtistsRailProps {
  me: HomeRecommendedArtistsRail_me$key
}

export const HomeRecommendedArtistsRail: React.FC<
  React.PropsWithChildren<HomeRecommendedArtistsRailProps>
> = ({ me }) => {
  const { trackEvent } = useTracking()
  const data = useFragment(FRAGMENT, me)
  const artists = extractNodes(data.artistRecommendations)

  if (artists.length === 0) {
    return null
  }

  return (
    <Rail
      alignItems="flex-start"
      title="Recommended Artists"
      viewAllLabel="View Artists"
      viewAllHref="/recommendations/artists"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtistGroup = {
          action: ActionType.clickedArtistGroup,
          context_module: ContextModule.recommendedArtistsRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.recommendedArtists,
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return artists.map(artist => {
          return (
            <CellArtistFragmentContainer
              key={artist.internalID}
              artist={artist}
              onClick={() => {
                const trackingEvent: ClickedArtistGroup = {
                  action: ActionType.clickedArtistGroup,
                  context_module: ContextModule.recommendedArtistsRail,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: artist.internalID,
                  destination_page_owner_slug: artist.slug,
                  destination_page_owner_type: OwnerType.artist,
                  type: "thumbnail",
                }
                trackEvent(trackingEvent)
              }}
            />
          )
        })
      }}
    />
  )
}

const FRAGMENT = graphql`
  fragment HomeRecommendedArtistsRail_me on Me {
    artistRecommendations(first: 10) {
      edges {
        node {
          internalID
          slug
          ...CellArtist_artist
        }
      }
    }
  }
`

export const HomeRecommendedArtistsRailQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { relayEnvironment, user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <SystemQueryRenderer<HomeRecommendedArtistsRailQuery>
      placeholder={PLACEHOLDER}
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeRecommendedArtistsRailQuery {
          me {
            ...HomeRecommendedArtistsRail_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return PLACEHOLDER
        }

        return <HomeRecommendedArtistsRail me={props.me} />
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Recommended Artists"
      viewAllLabel="View Artists"
      viewAllHref="/recommendations/artists"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <CellArtistPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)
