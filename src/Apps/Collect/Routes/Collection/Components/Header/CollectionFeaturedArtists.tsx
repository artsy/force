import { Column, GridColumns, Text } from "@artsy/palette"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectionFeaturedArtists_collection$data } from "__generated__/CollectionFeaturedArtists_collection.graphql"
import { CollectionFeaturedArtists_artworks$data } from "__generated__/CollectionFeaturedArtists_artworks.graphql"
import { compact, filter, take } from "lodash"
import { ContextModule } from "@artsy/cohesion"

interface CollectionFeaturedArtistsProps {
  collection: CollectionFeaturedArtists_collection$data
  artworks: CollectionFeaturedArtists_artworks$data
}

export const CollectionFeaturedArtists: React.FC<CollectionFeaturedArtistsProps> = ({
  artworks,
  collection,
}) => {
  const merchandisableArtists = artworks?.merchandisableArtists ?? []
  const hasMultipleArtists = merchandisableArtists.length > 1

  const featuredArtists = getFeaturedArtists(
    12,
    collection,
    merchandisableArtists
  )

  return (
    <>
      {collection.showFeaturedArtists && featuredArtists && hasMultipleArtists && (
        <>
          <Text variant="lg-display" mb={4}>
            Featured Artists
          </Text>

          <GridColumns>
            {featuredArtists.map(artist => {
              if (!artist.name) return

              return (
                <Column
                  span={[12, 6, 3, 3]}
                  key={artist.internalID}
                  data-test={ContextModule.featuredArtistsRail}
                  display="flex"
                  alignItems="center"
                >
                  <EntityHeaderArtistFragmentContainer
                    artist={artist}
                    width="100%"
                    alignItems="flex-start"
                  />
                </Column>
              )
            })}
          </GridColumns>
        </>
      )}
    </>
  )
}

export const CollectionFeaturedArtistsFragmentContainer = createFragmentContainer(
  CollectionFeaturedArtists,
  {
    collection: graphql`
      fragment CollectionFeaturedArtists_collection on MarketingCollection {
        category
        credit
        description
        featuredArtistExclusionIds
        headerImage
        id
        query {
          artistIDs
        }
        slug
        title
        showHeaderArtworksRail
        showFeaturedArtists
      }
    `,
    artworks: graphql`
      fragment CollectionFeaturedArtists_artworks on FilterArtworksConnection {
        merchandisableArtists {
          ...EntityHeaderArtist_artist
          internalID
          name
        }
      }
    `,
  }
)

export const getFeaturedArtists = (
  artistsCount: number,
  collection: CollectionFeaturedArtists_collection$data,
  merchandisableArtists: CollectionFeaturedArtists_artworks$data["merchandisableArtists"]
) => {
  if ((collection?.query?.artistIDs?.length ?? 0) > 0) {
    return compact(
      filter(merchandisableArtists, artist =>
        (collection?.query?.artistIDs ?? []).includes(
          artist?.internalID as string
        )
      )
    )
  }

  if ((merchandisableArtists?.length ?? 0) > 0) {
    const filteredArtistsIds = compact(
      merchandisableArtists?.filter(artist => {
        return !collection?.featuredArtistExclusionIds?.includes(
          artist?.internalID as string
        )
      })
    )

    return take(filteredArtistsIds, artistsCount)
  }

  // No artists
  return []
}
