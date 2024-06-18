import { Shelf, Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeWorksByArtistsYouFollowRail_homePage$data } from "__generated__/HomeWorksByArtistsYouFollowRail_homePage.graphql"
import { HomeWorksByArtistsYouFollowRailQuery } from "__generated__/HomeWorksByArtistsYouFollowRailQuery.graphql"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

interface HomeWorksByArtistsYouFollowRailProps {
  homePage: HomeWorksByArtistsYouFollowRail_homePage$data
}

const HomeWorksByArtistsYouFollowRail: React.FC<HomeWorksByArtistsYouFollowRailProps> = ({
  homePage,
}) => {
  const { trackEvent } = useTracking()

  const results = homePage.artworkModule?.results
  if (!results || results?.length === 0) {
    return null
  }

  return (
    <Shelf>
      {results.map((artwork, index) => {
        if (!artwork) {
          return <></>
        }

        return (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={index}
            contextModule={ContextModule.worksByArtistsYouFollowRail}
            lazyLoad
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.worksByArtistsYouFollowRail,
                context_page_owner_type: OwnerType.home,
                destination_page_owner_id: artwork.internalID,
                destination_page_owner_slug: artwork.slug,
                destination_page_owner_type: OwnerType.artwork,
                type: "thumbnail",
              }
              trackEvent(trackingEvent)
            }}
          />
        )
      })}
    </Shelf>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Shelf>
      {[...new Array(8)].map((_, i) => {
        return <ShelfArtworkPlaceholder key={i} index={i} />
      })}
    </Shelf>
  </Skeleton>
)

export const HomeWorksByArtistsYouFollowRailFragmentContainer = createFragmentContainer(
  HomeWorksByArtistsYouFollowRail,
  {
    homePage: graphql`
      fragment HomeWorksByArtistsYouFollowRail_homePage on HomePage {
        artworkModule(key: FOLLOWED_ARTISTS) {
          results {
            internalID
            slug
            ...ShelfArtwork_artwork
          }
        }
      }
    `,
  }
)

export const HomeWorksByArtistsYouFollowRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeWorksByArtistsYouFollowRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeWorksByArtistsYouFollowRailQuery {
          homePage {
            ...HomeWorksByArtistsYouFollowRail_homePage
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.homePage) {
          return (
            <HomeWorksByArtistsYouFollowRailFragmentContainer
              homePage={props.homePage}
            />
          )
        }

        return null
      }}
    />
  )
}
