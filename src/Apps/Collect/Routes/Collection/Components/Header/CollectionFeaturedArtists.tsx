import { ContextModule } from "@artsy/cohesion"
import { Column, GridColumns, Skeleton, Text } from "@artsy/palette"
import { initializeVariablesWithFilterState } from "Apps/Collect/collectRoutes"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { useRouter } from "System/Hooks/useRouter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { CollectionFeaturedArtistsQuery } from "__generated__/CollectionFeaturedArtistsQuery.graphql"
import type { CollectionFeaturedArtists_artworks$data } from "__generated__/CollectionFeaturedArtists_artworks.graphql"
import type { CollectionFeaturedArtists_collection$data } from "__generated__/CollectionFeaturedArtists_collection.graphql"
import { compact, filter, take } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"

interface CollectionFeaturedArtistsProps {
  collection: CollectionFeaturedArtists_collection$data
  artworks: CollectionFeaturedArtists_artworks$data
}

export const CollectionFeaturedArtists: React.FC<
  React.PropsWithChildren<CollectionFeaturedArtistsProps>
> = ({ artworks, collection }) => {
  const merchandisableArtists = artworks?.merchandisableArtists ?? []

  const featuredArtists = getFeaturedArtists(
    12,
    collection,
    merchandisableArtists,
  )

  if (!featuredArtists?.length) {
    return null
  }

  return (
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
  )
}

export const CollectionFeaturedArtistsFragmentContainer =
  createFragmentContainer(CollectionFeaturedArtists, {
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
  })

export const CollectionFeaturedArtistsQueryRenderer: React.FC<
  React.PropsWithChildren<{
    slug: string
  }>
> = ({ slug }) => {
  const { match } = useRouter()

  const { aggregations } = initializeVariablesWithFilterState(
    match.params,
    match,
  )

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<CollectionFeaturedArtistsQuery>
        query={graphql`
          query CollectionFeaturedArtistsQuery(
            $slug: String!
            $aggregations: [ArtworkAggregation]
          ) {
            marketingCollection(slug: $slug) {
              ...CollectionFeaturedArtists_collection

              artworksConnection(
                aggregations: $aggregations
                includeMediumFilterInAggregation: true
                first: 20
                sort: "-decayed_merch"
              ) {
                ...CollectionFeaturedArtists_artworks
              }
            }
          }
        `}
        variables={{
          aggregations,
          slug,
        }}
        placeholder={PLACEHOLDER}
        render={({ error, props }) => {
          if (error) {
            console.error(
              "[CollectionFeaturedArtists]: Error fetching featured artists",
              error,
            )
            return null
          }

          if (!props || !props.marketingCollection) {
            return PLACEHOLDER
          }

          if (!props.marketingCollection.artworksConnection) {
            return null
          }

          return (
            <CollectionFeaturedArtistsFragmentContainer
              collection={props.marketingCollection}
              artworks={props.marketingCollection.artworksConnection}
            />
          )
        }}
      />
    </LazyArtworkGrid>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Text variant="lg-display" mb={4}>
      Featured Artists
    </Text>

    <GridColumns>
      {[...Array(8)].map((artist, index) => {
        return (
          <Column
            span={[12, 6, 3, 3]}
            key={index}
            display="flex"
            alignItems="center"
          >
            <EntityHeaderPlaceholder />
          </Column>
        )
      })}
    </GridColumns>
  </Skeleton>
)

export const getFeaturedArtists = (
  artistsCount: number,
  collection: CollectionFeaturedArtists_collection$data,
  merchandisableArtists: CollectionFeaturedArtists_artworks$data["merchandisableArtists"],
) => {
  if ((collection?.query?.artistIDs?.length ?? 0) > 0) {
    return compact(
      filter(merchandisableArtists, artist =>
        (collection?.query?.artistIDs ?? []).includes(
          artist?.internalID as string,
        ),
      ),
    )
  }

  if ((merchandisableArtists?.length ?? 0) > 0) {
    const filteredArtistsIds = compact(
      merchandisableArtists?.filter(artist => {
        return !collection?.featuredArtistExclusionIds?.includes(
          artist?.internalID as string,
        )
      }),
    )

    return take(filteredArtistsIds, artistsCount)
  }

  // No artists
  return []
}
