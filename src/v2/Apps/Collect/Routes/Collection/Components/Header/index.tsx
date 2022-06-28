import { ContextModule } from "@artsy/cohesion"
import {
  Text,
  GridColumns,
  Breadcrumbs,
  Column,
  HTML,
  Spacer,
  ReadMore,
} from "@artsy/palette"
import { Header_artworks } from "v2/__generated__/Header_artworks.graphql"
import { Header_collection } from "v2/__generated__/Header_collection.graphql"
import { CollectionDefaultHeaderFragmentContainer } from "v2/Apps/Collect/Routes/Collection/Components/Header/DefaultHeader"
import { Link } from "found"
import { compact, filter, take } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { slugify } from "underscore.string"
import { EntityHeaderArtistFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderArtist"

export interface CollectionHeaderProps {
  collection: Header_collection
  artworks: Header_artworks
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  artworks,
  collection,
}) => {
  const hasMultipleArtists =
    artworks.merchandisableArtists && artworks.merchandisableArtists.length > 1

  const featuredArtists = getFeaturedArtists(
    12,
    collection,
    artworks.merchandisableArtists
  )

  return (
    <>
      {collection.headerImage && (
        <FullBleedHeader
          src={collection.headerImage}
          caption={collection.credit!}
        />
      )}

      <GridColumns mt={4} as="header" gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text variant="xl" as="h1" mb={1}>
            {collection.title}
          </Text>

          <Breadcrumbs>
            <Link to="/collect">All works</Link>
            <Link
              // TODO: Metaphysics should expose a slug
              to={`/collections#${slugify(collection.category)}`}
            >
              {collection.category}
            </Link>
          </Breadcrumbs>
        </Column>

        {collection.description && (
          <Column span={6}>
            <HTML variant="sm">
              <ReadMore maxChars={750} content={collection.description} />
            </HTML>
          </Column>
        )}
      </GridColumns>

      {!collection.headerImage && (
        <>
          <Spacer mt={6} />

          <CollectionDefaultHeaderFragmentContainer
            headerArtworks={artworks}
            collectionId={collection.id}
            collectionSlug={collection.slug}
            key={collection.slug}
          />
        </>
      )}

      <Spacer mt={6} />

      {featuredArtists && hasMultipleArtists && (
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

export const CollectionFilterFragmentContainer = createFragmentContainer(
  CollectionHeader,
  {
    collection: graphql`
      fragment Header_collection on MarketingCollection {
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
      }
    `,
    artworks: graphql`
      fragment Header_artworks on FilterArtworksConnection {
        ...DefaultHeader_headerArtworks
        merchandisableArtists {
          ...FollowArtistButton_artist
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
  collection: Header_collection,
  merchandisableArtists: Header_artworks["merchandisableArtists"]
) => {
  if ((collection?.query?.artistIDs?.length ?? 0) > 0) {
    return compact(
      filter(merchandisableArtists, artist =>
        (collection?.query?.artistIDs ?? []).includes(artist?.internalID!)
      )
    )
  }

  if ((merchandisableArtists?.length ?? 0) > 0) {
    const filteredArtistsIds = compact(
      merchandisableArtists?.filter(artist => {
        return !collection?.featuredArtistExclusionIds?.includes(
          artist?.internalID!
        )
      })
    )

    return take(filteredArtistsIds, artistsCount)
  }

  // No artists
  return []
}
