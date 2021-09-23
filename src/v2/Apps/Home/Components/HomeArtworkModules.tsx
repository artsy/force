import React from "react"
import { Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeArtworkModules_homePage } from "v2/__generated__/HomeArtworkModules_homePage.graphql"
import {
  HomeArtworkModuleKey,
  HomeArtworkModuleRailLazyQueryRenderer,
} from "./HomeArtworkModuleRail"
import { MyBidsQueryRenderer } from "v2/Apps/Auctions/Components/MyBids/MyBids"

interface HomeArtworkModulesProps {
  homePage: HomeArtworkModules_homePage
}

const HomeArtworkModules: React.FC<HomeArtworkModulesProps> = ({
  homePage,
}) => {
  return (
    <Join separator={<Spacer mt={6} />}>
      {homePage.artworkModules?.map((artworkModule, i) => {
        if (!artworkModule?.title || !artworkModule?.key) {
          return null
        }

        return (
          <React.Fragment key={artworkModule.title ?? i}>
            {(artworkModule.key as HomeArtworkModuleKey) === "ACTIVE_BIDS" ? (
              <MyBidsQueryRenderer />
            ) : (
              <HomeArtworkModuleRailLazyQueryRenderer
                title={artworkModule.title}
                params={{
                  key: artworkModule.key.toUpperCase() as HomeArtworkModuleKey,
                  id: artworkModule.params?.internalID,
                  relatedArtistID: artworkModule.params?.relatedArtistID,
                  followedArtistID: artworkModule.params?.followedArtistID,
                }}
              />
            )}
          </React.Fragment>
        )
      })}
    </Join>
  )
}

export const HomeArtworkModulesFragmentContainer = createFragmentContainer(
  HomeArtworkModules,
  {
    homePage: graphql`
      fragment HomeArtworkModules_homePage on HomePage {
        artworkModules(
          exclude: [
            FOLLOWED_ARTISTS
            GENERIC_GENES
            POPULAR_ARTISTS
            RECENTLY_VIEWED_WORKS
          ]
          maxRails: -1
          maxFollowedGeneRails: -1
          order: [
            ACTIVE_BIDS
            RECENTLY_VIEWED_WORKS
            SIMILAR_TO_RECENTLY_VIEWED
            SAVED_WORKS
            SIMILAR_TO_SAVED_WORKS
            FOLLOWED_ARTISTS
            FOLLOWED_GALLERIES
            RECOMMENDED_WORKS
            RELATED_ARTISTS
            LIVE_AUCTIONS
            CURRENT_FAIRS
            FOLLOWED_GENES
            GENERIC_GENES
          ]
        ) {
          title
          key
          params {
            internalID
            relatedArtistID
            followedArtistID
          }
        }
      }
    `,
  }
)
