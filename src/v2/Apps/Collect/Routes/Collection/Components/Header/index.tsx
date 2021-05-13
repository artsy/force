import { ContextModule } from "@artsy/cohesion"
import {
  EntityHeader,
  Text,
  GridColumns,
  Breadcrumbs,
  Column,
  HTML,
  Spacer,
} from "@artsy/palette"
import { Header_artworks } from "v2/__generated__/Header_artworks.graphql"
import { Header_collection } from "v2/__generated__/Header_collection.graphql"
import { CollectionDefaultHeaderFragmentContainer } from "v2/Apps/Collect/Routes/Collection/Components/Header/DefaultHeader"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { Link } from "found"
import { filter, take } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { slugify } from "underscore.string"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"

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
          // @ts-expect-error STRICT_NULL_CHECK
          caption={collection.credit}
        />
      )}

      <GridColumns mt={4} as="header" gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text variant="xl" as="h1" mb={1}>
            {collection.title}
          </Text>

          <Breadcrumbs>
            <Link to="/collect">All works</Link> /{" "}
            <Link to={`/collections#${slugify(collection.category)}`}>
              {collection.category}
            </Link>
          </Breadcrumbs>
        </Column>

        <Column span={6}>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          <HTML html={collection.description} variant="sm" />
        </Column>
      </GridColumns>

      {!collection.headerImage && (
        <>
          <Spacer mt={60} />

          <CollectionDefaultHeaderFragmentContainer
            headerArtworks={artworks}
            collectionId={collection.id}
            collectionSlug={collection.slug}
            key={collection.slug}
          />
        </>
      )}

      <Spacer mt={60} />

      {featuredArtists && hasMultipleArtists && (
        <GridColumns>
          <Column span={12}>
            <Text variant="lg" mb={2}>
              Featured Artists
            </Text>
          </Column>

          {featuredArtists.map(artist => {
            //  @ts-expect-error STRICT_NULL_CHECK
            const hasArtistMetaData = artist.nationality && artist.birthday

            return (
              <Column
                span={[12, 6, 3, 3]}
                //  @ts-expect-error STRICT_NULL_CHECK
                key={artist.internalID}
                data-test={ContextModule.featuredArtistsRail}
              >
                <EntityHeader
                  //  @ts-expect-error STRICT_NULL_CHECK
                  name={artist.name}
                  //  @ts-expect-error STRICT_NULL_CHECK
                  imageUrl={artist.image.resized.url}
                  //  @ts-expect-error STRICT_NULL_CHECK
                  href={`/artist/${artist.slug}`}
                  meta={
                    hasArtistMetaData
                      ? //  @ts-expect-error STRICT_NULL_CHECK
                        `${artist.nationality}, b. ${artist.birthday}`
                      : undefined
                  }
                  FollowButton={
                    <FollowArtistButtonFragmentContainer
                      //  @ts-expect-error STRICT_NULL_CHECK
                      artist={artist}
                      contextModule={ContextModule.featuredArtistsRail}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
                      }}
                    />
                  }
                />
              </Column>
            )
          })}
        </GridColumns>
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
          slug
          internalID
          name
          image {
            resized(width: 45, height: 45, version: "square") {
              url
            }
          }
          birthday
          nationality
          ...FollowArtistButton_artist
        }
      }
    `,
  }
)

export const getFeaturedArtists = (
  artistsCount: number,
  collection: Header_collection,
  merchandisableArtists: Header_artworks["merchandisableArtists"]
): Header_artworks["merchandisableArtists"] => {
  //  @ts-expect-error STRICT_NULL_CHECK
  if (collection.query.artistIDs?.length > 0) {
    return filter(merchandisableArtists, artist =>
      //  @ts-expect-error STRICT_NULL_CHECK
      collection.query.artistIDs.includes(artist.internalID)
    )
  }

  //  @ts-expect-error STRICT_NULL_CHECK
  if (merchandisableArtists?.length > 0) {
    //  @ts-expect-error STRICT_NULL_CHECK
    const filteredArtistsIds = merchandisableArtists.filter(artist => {
      //  @ts-expect-error STRICT_NULL_CHECK
      return !collection.featuredArtistExclusionIds.includes(artist.internalID)
    })
    return take(filteredArtistsIds, artistsCount)
  }

  // No artists
  return []
}
