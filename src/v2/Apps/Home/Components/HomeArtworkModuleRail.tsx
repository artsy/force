import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import {
  Shelf,
  Text,
  Spacer,
  Skeleton,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { HomeArtworkModuleRail_artworkModule } from "v2/__generated__/HomeArtworkModuleRail_artworkModule.graphql"
import { HomeArtworkModuleRailQuery } from "v2/__generated__/HomeArtworkModuleRailQuery.graphql"
import { useSystemContext } from "v2/System"
import { HomeArtworkModuleContextFragmentContainer } from "./HomeArtworkModuleContext"

const HOME_ARTWORK_MODULES = [
  "active_bids",
  "current_fairs",
  "followed_artist",
  "followed_artists",
  "followed_galleries",
  "generic_gene", // GENERIC_GENES
  "genes", // FOLLOWED_GENES
  "live_auctions",
  "popular_artists",
  "recently_viewed_works",
  "recommended_works",
  "related_artists",
  "saved_works",
  "similar_to_recently_viewed",
  "similar_to_saved_works",
] as const

export type HomeArtworkModuleKey = typeof HOME_ARTWORK_MODULES[number]

const CONTEXT_MODULES: Record<HomeArtworkModuleKey, AuthContextModule> = {
  // @ts-ignore TODO: Add to AuthContextModule union
  active_bids: ContextModule.yourActiveBids,
  current_fairs: ContextModule.fairRail,
  followed_artist: ContextModule.otherWorksByArtistRail,
  // @ts-ignore TODO: Add to AuthContextModule union
  followed_artists: ContextModule.newWorksByArtistsYouFollowRail,
  // @ts-ignore TODO: Add to AuthContextModule union
  followed_galleries: ContextModule.newWorksByGalleriesYouFollowRail,
  generic_gene: ContextModule.categoryRail,
  genes: ContextModule.categoryRail,
  live_auctions: ContextModule.liveAuctionsRail,
  popular_artists: ContextModule.popularArtistsRail,
  recently_viewed_works: ContextModule.recentlyViewedRail,
  related_artists: ContextModule.relatedArtistsRail,
  // @ts-ignore TODO: Add to AuthContextModule union
  recommended_works: ContextModule.recommendedWorksForYouRail,
  // @ts-ignore TODO: Add to AuthContextModule union
  saved_works: ContextModule.recentlySavedRail,
  // @ts-ignore TODO: Add to AuthContextModule union
  similar_to_recently_viewed: ContextModule.similarToWorksYouViewedRail,
  // @ts-ignore TODO: Add to AuthContextModule union
  similar_to_saved_works: ContextModule.similarToWorksYouSavedRail,
}

interface HomeArtworkModuleRailProps {
  artworkModule: HomeArtworkModuleRail_artworkModule
}

const HomeArtworkModuleRail: React.FC<HomeArtworkModuleRailProps> = ({
  artworkModule,
}) => {
  const artworks = compact(artworkModule.results)

  if (artworks.length === 0) {
    return null
  }

  return (
    <HomeArtworkModule
      context={
        <HomeArtworkModuleContextFragmentContainer
          title={artworkModule.title}
          context={artworkModule.context}
        />
      }
    >
      <Shelf>
        {artworks.map(artwork => {
          return (
            <ShelfArtworkFragmentContainer
              contextModule={CONTEXT_MODULES[artworkModule.key!]}
              artwork={artwork}
              lazyLoad
            />
          )
        })}
      </Shelf>
    </HomeArtworkModule>
  )
}

const HomeArtworkModuleRailFragmentContainer = createFragmentContainer(
  HomeArtworkModuleRail,
  {
    artworkModule: graphql`
      fragment HomeArtworkModuleRail_artworkModule on HomePageArtworkModule {
        title
        key
        results {
          ...ShelfArtwork_artwork
        }
        context {
          __typename
          ...HomeArtworkModuleContext_context
        }
      }
    `,
  }
)

const HomeArtworkModule: React.FC<{ context: string | JSX.Element }> = ({
  context,
  children,
}) => {
  return (
    <>
      {typeof context === "string" ? (
        <Text variant="lg">{context}</Text>
      ) : (
        context
      )}

      <Spacer mt={4} />

      {children}
    </>
  )
}

const HomeArtworkModuleRailPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <Shelf>
        {[...new Array(12)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />

              <Spacer mt={1} />

              <SkeletonText variant="md">Artist Name</SkeletonText>
              <SkeletonText variant="md">Artwork Title</SkeletonText>
              <SkeletonText variant="xs">Partner</SkeletonText>
              <SkeletonText variant="xs">Price</SkeletonText>
            </React.Fragment>
          )
        })}
      </Shelf>
    </Skeleton>
  )
}

const HomeArtworkModulePlaceholder: React.FC<{ title: string }> = ({
  title,
}) => (
  <HomeArtworkModule context={title}>
    <HomeArtworkModuleRailPlaceholder />
  </HomeArtworkModule>
)

interface HomeArtworkModuleRailQueryRendererProps {
  title: string
  params: {
    key: string
    id?: string | null
    relatedArtistID?: string | null
    followedArtistID?: string | null
  }
}

export const HomeArtworkModuleRailQueryRenderer: React.FC<HomeArtworkModuleRailQueryRendererProps> = ({
  title,
  params: { key, id, relatedArtistID, followedArtistID },
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeArtworkModuleRailQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeArtworkModuleRailQuery(
          $key: String
          $id: String
          $relatedArtistID: String
          $followedArtistID: String
        ) {
          homePage {
            artworkModule(
              key: $key
              id: $id
              relatedArtistID: $relatedArtistID
              followedArtistID: $followedArtistID
            ) {
              ...HomeArtworkModuleRail_artworkModule
            }
          }
        }
      `}
      variables={{
        key,
        id,
        relatedArtistID,
        followedArtistID,
      }}
      placeholder={<HomeArtworkModulePlaceholder title={title} />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <HomeArtworkModulePlaceholder title={title} />
        }

        if (props.homePage.artworkModule) {
          return (
            <HomeArtworkModuleRailFragmentContainer
              artworkModule={props.homePage.artworkModule}
            />
          )
        }
      }}
    />
  )
}
