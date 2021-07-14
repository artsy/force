import React from "react"
import { Join, Separator, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeArtworkModules_homePage } from "v2/__generated__/HomeArtworkModules_homePage.graphql"
import {
  HomeArtworkModuleKey,
  HomeArtworkModuleRailLazyQueryRenderer,
} from "./HomeArtworkModuleRail"
import { MyBidsQueryRenderer } from "v2/Apps/Auctions/Components/MyBids/MyBids"
import { HomeFeaturedShowsLazyQueryRenderer } from "./HomeFeaturedShows"
import { compact } from "lodash"

interface HomeArtworkModulesProps {
  homePage: HomeArtworkModules_homePage
}

const HomeArtworkModules: React.FC<HomeArtworkModulesProps> = ({
  homePage,
}) => {
  if (!homePage.artworkModules || homePage.artworkModules.length === 0) {
    // HACK: Return featured shows if there are no artwork modules
    return <HomeFeaturedShowsLazyQueryRenderer />
  }

  // HACK: Insert featured shows before any of the gene modules (it is not an artwork module)
  let isShowsInserted = false
  const artworkModules = compact(
    homePage.artworkModules.flatMap(artworkModule => {
      if (artworkModule?.key?.includes("gene") && !isShowsInserted) {
        isShowsInserted = true
        return [
          {
            key: "featured_shows",
            // HACK: To keep this simple just some garbage data to satisfy the types
            title: "IGNORE",
            params: {
              internalID: "IGNORE",
              relatedArtistID: "IGNORE",
              followedArtistID: "IGNORE",
            },
          },
          artworkModule,
        ]
      }

      return artworkModule
    })
  )

  return (
    <Join separator={<Spacer mt={6} />}>
      {artworkModules.map((artworkModule, i) => {
        // HACK: Insert featured shows
        if (artworkModule.key === "featured_shows") {
          return (
            <>
              <HomeFeaturedShowsLazyQueryRenderer />

              <Separator />
            </>
          )
        }

        if (!artworkModule.title || !artworkModule.key) {
          return null
        }

        return (
          <React.Fragment key={artworkModule.title ?? i}>
            {(artworkModule.key as HomeArtworkModuleKey) === "active_bids" ? (
              <MyBidsQueryRenderer />
            ) : (
              <HomeArtworkModuleRailLazyQueryRenderer
                title={artworkModule.title}
                params={{
                  key: artworkModule.key,
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
