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
import { Header_artworks$data } from "__generated__/Header_artworks.graphql"
import { Header_collection$data } from "__generated__/Header_collection.graphql"
import { CollectionDefaultHeaderFragmentContainer } from "Apps/Collect/Routes/Collection/Components/Header/DefaultHeader"
import { Link } from "found"
import { compact, filter, take } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { slugify } from "underscore.string"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"

export interface CollectionHeaderProps {
  collection: Header_collection$data
  artworks: Header_artworks$data
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
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
      {collection.headerImage && (
        <FullBleedHeader
          src={collection.headerImage}
          caption={collection.credit as string}
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

      {collection.showHeaderArtworksRail && !collection.headerImage && (
        <>
          <Spacer y={6} />

          <CollectionDefaultHeaderFragmentContainer
            headerArtworks={artworks}
            collectionId={collection.id}
            collectionSlug={collection.slug}
            key={collection.slug}
          />
        </>
      )}

      <Spacer y={6} />

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
        showHeaderArtworksRail
        showFeaturedArtists
      }
    `,
    artworks: graphql`
      fragment Header_artworks on FilterArtworksConnection {
        ...DefaultHeader_headerArtworks
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
  collection: Header_collection$data,
  merchandisableArtists: Header_artworks$data["merchandisableArtists"]
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
